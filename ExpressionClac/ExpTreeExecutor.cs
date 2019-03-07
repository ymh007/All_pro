using ExpressionClac.Properties;
using System;
using System.Collections.Generic;
using System.Text;
using static ExpressionClac.ExpClass;

namespace ExpressionClac
{
    /// <summary>
	/// 语法分析Tree的计算类
	/// </summary>
	internal class ExpTreeExecutor
    {
        #region CalculateContext
        private class CalculateContext
        {
            private bool optimize = true;
            private object callerContxt = null;
            private CalculateUserFunction userFunction = null;

            public bool Optimize
            {
                get { return this.optimize; }
                set { this.optimize = value; }
            }

            public object CallerContxt
            {
                get { return this.callerContxt; }
                set { this.callerContxt = value; }
            }


            public CalculateUserFunction CalculateUserFunction
            {
                get { return this.userFunction; }
                set { this.userFunction = value; }
            }

            public CalculateContext()
            {
            }
        }
        #endregion CalculateContext

        public static readonly ExpTreeExecutor Instance = new ExpTreeExecutor();

        private ExpTreeExecutor()
        {
        }

        /// <summary>
        /// 获取树结点值
        /// </summary>
        /// <param name="tree">二叉树节点</param>
        /// <param name="calcUDF">用户自定义函数的委托</param>
        /// <param name="callerContext">调用者上下文</param>
        /// <param name="optimize">最优化选项</param>
        /// <returns>树结点值</returns>
        public object GetValue(ExpTreeNode tree, CalculateUserFunction calcUDF, object callerContext, bool optimize)
        {
            object result = null;

            if (tree != null)
            {
                CalculateContext calcContext = new CalculateContext();

                calcContext.Optimize = optimize;
                calcContext.CallerContxt = callerContext;
                calcContext.CalculateUserFunction = calcUDF;

                result = VExp(tree, calcContext);
            }

            return result;
        }

        private object VExp(ExpTreeNode node, CalculateContext calcContext)
        {
            object oValue = null;

            if (node != null)
            {
                try
                {
                    switch (node.OperationID)
                    {
                        case Operation_IDs.OI_NUMBER:
                        case Operation_IDs.OI_STRING:
                        case Operation_IDs.OI_NEG:
                        case Operation_IDs.OI_BOOLEAN:
                        case Operation_IDs.OI_DATETIME:
                            oValue = node.Value;
                            break;
                        case Operation_IDs.OI_ADD:
                            oValue = AddOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_MINUS:
                            {
                                object p1 = VExp(node.Left, calcContext);
                                object p2 = VExp(node.Right, calcContext);

                                CheckOperandNull(p1, p2, node.Position);
                                oValue = NToD(p1) - NToD(p2);
                            }
                            break;
                        case Operation_IDs.OI_MUL:
                            {
                                object p1 = VExp(node.Left, calcContext);
                                object p2 = VExp(node.Right, calcContext);

                                CheckOperandNull(p1, p2, node.Position);
                                oValue = NToD(p1) * NToD(p2);
                            }
                            break;
                        case Operation_IDs.OI_DIV:
                            {
                                object p1 = VExp(node.Left, calcContext);
                                object p2 = VExp(node.Right, calcContext);

                                CheckOperandNull(p1, p2, node.Position);
                                if (NToD(p2) == 0.0)
                                {
                                    throw ParsingException.NewParsingException(ParseError.peFloatOverflow, node.Position);
                                }
                                oValue = NToD(p1) / NToD(p2);
                            }
                            break;
                        case Operation_IDs.OI_LOGICAL_OR:
                            {
                                oValue = (bool)VExp(node.Left, calcContext);
                                object oRight = (bool)false;

                                if ((bool)oValue == false)
                                    oRight = VExp(node.Right, calcContext);

                                CheckOperandNull(oValue, oRight, node.Position);
                                oValue = (bool)oValue || (bool)oRight;
                            }
                            break;
                        case Operation_IDs.OI_LOGICAL_AND:
                            {
                                oValue = (bool)VExp(node.Left, calcContext);
                                object oRight = (bool)true;

                                if ((bool)oValue == true)
                                    oRight = VExp(node.Right, calcContext);

                                CheckOperandNull(oValue, oRight, node.Position);
                                oValue = (bool)oValue && (bool)oRight;
                            }
                            break;
                        case Operation_IDs.OI_NOT:
                            oValue = VExp(node.Right, calcContext);
                            CheckOperandNull(oValue, node.Position);
                            oValue = !(bool)oValue;
                            break;
                        case Operation_IDs.OI_GREAT:
                            oValue = CompareGreatOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_GREATEQUAL:
                            oValue = CompareGreatEqualOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_LESS:
                            oValue = CompareLessOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_LESSEQUAL:
                            oValue = CompareLessEqualOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_NOT_EQUAL:
                            oValue = CompareNotEqualOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_EQUAL:
                            oValue = CompareEqualOP(VExp(node.Left, calcContext), VExp(node.Right, calcContext), node.Position);
                            break;
                        case Operation_IDs.OI_USERDEFINE:
                            {
                                ParamObjectCollection poc = GetParams(node.Params, calcContext);

                                oValue = CalculateFunction(node.FunctionName, poc, calcContext);
                            }
                            break;
                        default:
                            throw ParsingException.NewParsingException(
                                ParseError.peInvalidOperator,
                                node.Position, node.OperationID.ToString());
                            //EnumItemDescriptionAttribute.GetAttribute(node.OperationID).ShortName);
                    }
                }
                catch (System.InvalidCastException)
                {
                    throw ParsingException.NewParsingException(ParseError.peTypeMismatch, node.Position);
                }
            }

            return oValue;
        }

        private static object CalculateFunction(string strFuncName, ParamObjectCollection arrParams, CalculateContext calcContext)
        {
            object oValue = null;

            try
            {
                switch (strFuncName.ToLower())
                {
                    case "now":
                        oValue = DateTime.Now;
                        break;
                    case "today":
                        oValue = DateTime.Today;
                        break;
                    case "dateinterval.day":
                        oValue = "d";
                        break;
                    case "dateinterval.hour":
                        oValue = "h";
                        break;
                    case "dateinterval.minute":
                        oValue = "n";
                        break;
                    case "dateinterval.second":
                        oValue = "s";
                        break;
                    case "dateinterval.millisecond":
                        oValue = "ms";
                        break;
                    case "datediff":
                        oValue = DoDateDiff(arrParams);
                        break;
                    case "mindate":
                        oValue = DateTime.MinValue;
                        break;
                    case "maxdate":
                        oValue = DateTime.MaxValue;
                        break;
                    case "in":
                        oValue = DoInFunction(arrParams, calcContext);
                        break;
                    default:
                        {
                            if (calcContext.CalculateUserFunction != null)
                                oValue = calcContext.CalculateUserFunction(strFuncName, arrParams, calcContext.CallerContxt);

                            break;
                        }
                }

                return oValue;
            }
            catch (ParsingException)
            {
                throw;
            }
            catch (System.Exception ex)
            {
                throw new SystemSupportException(string.Format(Resources.FunctionError, strFuncName, ex.Message));
            }
        }

        private static object DoInFunction(ParamObjectCollection arrParams, CalculateContext calcContext)
        {
            bool result = false;

            if (arrParams.Count > 0)
            {
                object sourceData = arrParams[0].Value;

                for (int i = 1; i < arrParams.Count; i++)
                {
                    if ((bool)CompareEqualOP(sourceData, arrParams[i].Value, 0))
                    {
                        result = true;
                        break;
                    }
                }
            }

            return result;
        }

        private static object DoDateDiff(ParamObjectCollection arrParams)
        {
            arrParams.CheckParamsLength(3);
            arrParams[0].CheckParameterType<string>();
            arrParams[1].CheckParameterType<DateTime>();
            arrParams[2].CheckParameterType<DateTime>();

            DateTime startTime = (DateTime)arrParams[1].Value;
            DateTime endTime = (DateTime)arrParams[2].Value;

            TimeSpan ts = endTime - startTime;

            double result = 0;

            string intervalType = arrParams[0].Value.ToString().ToLower();

            switch (intervalType)
            {
                case "d":
                    result = ts.TotalDays;
                    break;
                case "h":
                    result = ts.TotalHours;
                    break;
                case "n":
                    result = ts.TotalMinutes;
                    break;
                case "s":
                    result = ts.TotalSeconds;
                    break;
                case "ms":
                    result = ts.TotalMilliseconds;
                    break;
                default:
                    throw new SystemSupportException(string.Format(Resources.InvalidDateDiffType, intervalType));
            }

            return Math.Ceiling(result);
        }

        private ParamObjectCollection GetParams(List<ExpTreeNode> arrParams, CalculateContext calcContext)
        {
            List<ParamObject> list = new List<ParamObject>();

            for (int i = 0; i < arrParams.Count; i++)
            {
                ExpTreeNode node = (ExpTreeNode)arrParams[i];

                list.Add(new ParamObject(VExp(node, calcContext), node.Position, i));
            }

            return new ParamObjectCollection(list);
        }

        private static void CheckOperandNull(object p, int nPos)
        {
            if (p == null)
                throw ParsingException.NewParsingException(ParseError.peNeedOperand, nPos);
        }

        private static void CheckOperandNull(object p1, object p2, int nPos)
        {
            if (p1 == null || p2 == null)
                throw ParsingException.NewParsingException(ParseError.peNeedOperand, nPos);
        }

        private static object AddOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            object result;

            if (p1 is System.String || p2 is System.String)
                result = p1.ToString() + p2.ToString();
            else
                result = NToD(p1) + NToD(p2);

            return result;
        }

        private static object CompareGreatOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) > (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString().CompareTo(p2.ToString()) > 0;
            else
                result = NToD(p1) > NToD(p2);

            return result;
        }

        private static object CompareLessOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) < (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString().CompareTo(p2.ToString()) < 0;
            else
                result = NToD(p1) < NToD(p2);

            return result;
        }

        private static object CompareEqualOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) == (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString() == p2.ToString();
            else
                result = NToD(p1) == NToD(p2);

            return result;
        }

        private static object CompareNotEqualOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) != (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString() != p2.ToString();
            else
                result = NToD(p1) != NToD(p2);

            return result;
        }

        private static object CompareGreatEqualOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) >= (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString().CompareTo(p2.ToString()) >= 0;
            else
                result = NToD(p1) >= NToD(p2);

            return result;
        }

        private static object CompareLessEqualOP(object p1, object p2, int nPos)
        {
            CheckOperandNull(p1, p2, nPos);
            bool result;

            if (p1 is System.DateTime || p2 is System.DateTime)
                result = (DateTime)DataConverter.ChangeType(p1, typeof(DateTime)) <= (DateTime)DataConverter.ChangeType(p2, typeof(DateTime));
            else
                if (p1 is System.String || p2 is System.String)
                result = p1.ToString().CompareTo(p2.ToString()) <= 0;
            else
                result = NToD(p1) <= NToD(p2);

            return result;
        }

        /// <summary>
        /// 将数字转换为double
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        private static double NToD(object p)
        {
            return Convert.ToDouble(p);
        }
    }


    /// <summary>
	/// 提供字符串与枚举类型的转换，TimeSpan与整形的转换。
	/// </summary>
	/// <remarks>提供字符串和枚举、TimeSpan的转换
	/// </remarks>
	public static class DataConverter
    {
        /// <summary>
        /// 类型转换，提供字符串与枚举型、TimeSpan与整型之间的转换
        /// </summary>
        /// <typeparam name="TSource">源数据的类型</typeparam>
        /// <typeparam name="TResult">目标数据的类型</typeparam>
        /// <param name="srcValue">源数据的值</param>
        /// <returns>类型转换结果</returns>
        /// <remarks>
        /// 数据转换，主要调用系统Convert类的ChangeType方法，但是对于字符串与枚举，整型与TimeSpan类型之间的转换，进行了特殊处理。
        /// <seealso cref="MCS.Library.Core.XmlHelper"/>
        /// </remarks>
        public static TResult ChangeType<TSource, TResult>(TSource srcValue)
        {
            return (TResult)ChangeType(srcValue, typeof(TResult));
        }

        /// <summary>
        /// 字符串与枚举型、TimeSpan与整型之间转换的方法。
        /// </summary>
        /// <typeparam name="TSource">源数据类型</typeparam>
        /// <param name="srcValue">源数据的值</param>
        /// <param name="targetType">目标数据类型</param>
        /// <returns>类型转换后的结果</returns>
        /// <remarks>字符串与枚举型、TimeSpan与整型之间转换的方法。
        /// <seealso cref="MCS.Library.Core.XmlHelper"/>
        /// </remarks>
        public static object ChangeType<TSource>(TSource srcValue, System.Type targetType)
        {
            System.Type srcType = typeof(TSource);

            return ChangeType(srcType, srcValue, targetType);
        }

        /// <summary>
        /// 字符串与枚举型、TimeSpan与整型之间转换的方法。
        /// </summary>
        /// <param name="srcType">源数据类型</param>
        /// <param name="srcValue">源数据的值</param>
        /// <param name="targetType">目标数据类型</param>
        /// <returns>类型转换后的结果</returns>
        /// <remarks>字符串与枚举型、TimeSpan与整型之间转换的方法。
        /// <seealso cref="MCS.Library.Core.XmlHelper"/>
        /// </remarks>
        public static object ChangeType(System.Type srcType, object srcValue, System.Type targetType)
        {
            if (targetType == null) throw new ArgumentNullException("message");
            bool dealed = false;
            object result = null;

            if (srcType == typeof(object))
                if (srcValue != null)
                    srcType = srcValue.GetType();

            if (srcType == targetType)
            {
                result = srcValue;
                dealed = true;
            }
            else
                if (targetType == typeof(object))
            {
                result = srcValue;
                dealed = true;
            }
            else
                    if (targetType.IsEnum)
            {
                if (srcType == typeof(string) || srcType == typeof(int))
                {
                    if (srcValue is string && string.IsNullOrEmpty((srcValue).ToString()))
                    {
                        result = Enum.Parse(targetType, "0");
                    }
                    else
                    {
                        result = Enum.Parse(targetType, srcValue.ToString());
                    }

                    dealed = true;
                }
            }
            else
                        if (targetType == typeof(string) && srcType == typeof(DateTime))
            {
                result = string.Format("{0:yyyy-MM-ddTHH:mm:ss.fff}", srcValue);

                dealed = true;
            }
            else
                            if (targetType == typeof(TimeSpan))
            {
                if (srcType == typeof(TimeSpan))
                    result = srcValue;
                else
                    result = TimeSpan.FromSeconds((double)Convert.ChangeType(srcValue, typeof(double)));

                dealed = true;
            }
            else
                                if (targetType == typeof(bool) && srcType == typeof(string))
                result = StringToBool(srcValue.ToString(), out dealed);
            else
                                    if (targetType == typeof(DateTime) && srcType == typeof(string))
            {
                if (srcValue == null || srcValue.ToString() == string.Empty)
                {
                    result = DateTime.MinValue;
                    dealed = true;
                }
            }

            if (dealed == false)
            {
                if (targetType != typeof(object) && targetType.IsAssignableFrom(srcType))
                    result = srcValue;
                else
                    result = Convert.ChangeType(srcValue, targetType);
            }

            return result;
        }

        private static bool StringToBool(string srcValue, out bool dealed)
        {
            bool result = false;
            dealed = false;

            srcValue = srcValue.Trim();

            if (srcValue.Length > 0)
            {
                if (srcValue.Length == 1)
                {
                    result = ((string.Compare(srcValue, "0") != 0) && (string.Compare(srcValue, "n", true) != 0));

                    dealed = true;
                }
                else
                {
                    if (string.Compare(srcValue, "YES", true) == 0 || string.Compare(srcValue, "是", true) == 0 || string.Compare(srcValue, "TRUE", true) == 0)
                    {
                        result = true;
                        dealed = true;
                    }
                    else
                    {
                        if (string.Compare(srcValue, "NO", true) == 0 || string.Compare(srcValue, "否", true) == 0 || string.Compare(srcValue, "FALSE", true) == 0)
                        {
                            result = false;
                            dealed = true;
                        }
                    }
                }
            }
            else
            {
                dealed = true;  //空串表示False
            }

            return result;
        }
    }
}
