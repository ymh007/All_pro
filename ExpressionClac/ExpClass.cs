﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using ExpressionClac.Properties;
namespace ExpressionClac
{

      

    /// <summary>
	/// 为表达式识别错误封装的异常
	/// </summary>
	/// <remarks>
	/// 封装的解析错误，在表达式解析过程中会报出异常，提示信息包括错误原因、出错位置
	/// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="parse_error" lang="cs" />
	/// </remarks>
	[Serializable]
    public sealed class ParsingException : System.Exception
    {
        private ParseError reason = ParseError.peNone;
        private int position = -1;

        /// <summary>
        /// 构造函数，根据错误类型、出错位置构造异常
        /// </summary>
        /// <param name="pe">错误类型</param>
        /// <param name="nPosition">出错位置</param>
        /// <param name="strMsg">错误信息</param>
        public ParsingException(ParseError pe, int nPosition, string strMsg)
            : base(strMsg)
        {
            this.reason = pe;
            this.position = nPosition;
        }

        /// <summary>
        /// 错误原因
        /// </summary>
        public ParseError Reason
        {
            get
            {
                return this.reason;
            }
        }

        /// <summary>
        /// 出错位置
        /// </summary>
        public int Position
        {
            get
            {
                return this.position;
            }
        }

        /// <summary>
        /// 产生一个新的表达式识别异常
        /// </summary>
        /// <param name="pe">错误原因</param>
        /// <param name="nPosition">出错位置</param>
        /// <param name="strParams">在错误信息中的参数</param>
        /// <returns>表达式识别异常对象</returns>
        /// <remarks>
        /// 对表达式模块中产生的错误进行封装
        /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="parse_error" lang="cs" title="异常的封装" />
        /// </remarks>
        static public ParsingException NewParsingException(ParseError pe, int nPosition, params string[] strParams)
        {
            string strText = Resources.ResourceManager.GetString(pe.ToString());
            strText = string.Format(strText, strParams);
            if (nPosition >= 0)
                strText = string.Format(Resources.position, nPosition + 1) + ", " + strText;
            return new ParsingException(pe, nPosition, strText);
        }
    }


    /// <summary>
    /// 错误类别
    /// </summary>
    /// <remarks>
    /// 表达式解析的一些错误封装
    /// </remarks>
    public enum ParseError
    {
        /// <summary>
        /// 无异常
        /// </summary>
        peNone = 0,

        /// <summary>
        /// 非法字符
        /// </summary>
        peInvalidChar,

        /// <summary>
        /// 非法的字符串
        /// </summary>
        peInvalidString,

        /// <summary>
        /// 非法操作符
        /// </summary>
        peInvalidOperator,

        /// <summary>
        /// 类型不匹配
        /// </summary>
        peTypeMismatch,

        /// <summary>
        /// 非法的参数
        /// </summary>
        peInvalidParam,

        /// <summary>
        /// 非法的用户自定义函数返回值
        /// </summary>
        peInvalidUFValue,

        /// <summary>
        /// 语法错误
        /// </summary>
        peSyntaxError,

        /// <summary>
        /// 浮点运算溢出
        /// </summary>
        peFloatOverflow,

        /// <summary>
        /// 需要某个字符
        /// </summary>
        peCharExpected,

        /// <summary>
        /// 函数错误
        /// </summary>
        peFuncError,

        /// <summary>
        /// 需要操作数
        /// </summary>
        peNeedOperand,

        /// <summary>
        /// 格式错误
        /// </summary>
        peFormatError,

        /// <summary>
        /// 参数类型错误
        /// </summary>
        InvalidParameterType,


        ///// <summary>
        ///// 参数个数错误
        ///// </summary>
        //InvalidParameterNum, 
    }

    /// <summary>
    /// 操作类型，作为语法分析二叉树节点中的运算符标识
    /// </summary>
    //public enum ParseOperation
    public enum Operation_IDs
    {
        /// <summary>
        /// 无操作符
        /// </summary>
        //[EnumItemDescription("无操作符", ShortName = "")]
        OI_NONE = 0,

        /// <summary>
        /// 非
        /// </summary>
        //[EnumItemDescription("非操作符", ShortName = "!")]
        OI_NOT = 120,

        /// <summary>
        /// 加
        /// </summary>
        //[EnumItemDescription("加操作符", ShortName = "+")]
        OI_ADD,

        /// <summary>
        /// 减
        /// </summary>
        //[EnumItemDescription("减操作符", ShortName = "-")]
        OI_MINUS,

        /// <summary>
        /// 乘
        /// </summary>
        //[EnumItemDescription("乘操作符", ShortName = "*")]
        OI_MUL,

        /// <summary>
        /// 除
        /// </summary>
        //[EnumItemDescription("除操作符", ShortName = "/")]
        OI_DIV,

        /// <summary>
        /// 负号
        /// </summary>
        //[EnumItemDescription("负操作符", ShortName = "-")]
        OI_NEG,

        /// <summary>
        /// 等于
        /// </summary>
        //[EnumItemDescription("等于操作符", ShortName = "==")]
        OI_EQUAL,

        /// <summary>
        /// 不等于
        /// </summary>
        //[EnumItemDescription("不等于操作符", ShortName = "<>")]
        OI_NOT_EQUAL,

        /// <summary>
        /// 大于
        /// </summary>
        //[EnumItemDescription("大于操作符", ShortName = ">")]
        OI_GREAT,

        /// <summary>
        /// 大于等于
        /// </summary>
        //[EnumItemDescription("大于等于操作符", ShortName = ">=")]
        OI_GREATEQUAL,

        /// <summary>
        /// 小于
        /// </summary>
        //[EnumItemDescription("小于操作符", ShortName = "<")]
        OI_LESS,

        /// <summary>
        /// 小于等于
        /// </summary>
        //[EnumItemDescription("小于等于操作符", ShortName = "<=")]
        OI_LESSEQUAL,

        /// <summary>
        ///逻辑与 
        /// </summary>
        //[EnumItemDescription("逻辑与操作符", ShortName = "&&")]
        OI_LOGICAL_AND,

        /// <summary>
        /// 逻辑或
        /// </summary>
        //[EnumItemDescription("逻辑或操作符", ShortName = "||")]
        OI_LOGICAL_OR,

        /// <summary>
        /// 左括号
        /// </summary>
        //[EnumItemDescription("左括号操作符", ShortName = "(")]
        OI_LBRACKET,

        /// <summary>
        /// 右括号
        /// </summary>
        //[EnumItemDescription("右括号操作符", ShortName = ")")]
        OI_RBRACKET,

        /// <summary>
        /// 逗号
        /// </summary>
        //[EnumItemDescription("逗号操作符", ShortName = ",")]
        OI_COMMA,

        /// <summary>
        /// 自定义函数
        /// </summary>
        //[EnumItemDescription("自定义函数", ShortName = "自定义函数")]
        OI_USERDEFINE,

        /// <summary>
        /// 字符串
        /// </summary>
        //[EnumItemDescription("字符串", ShortName = "字符串")]
        OI_STRING,

        /// <summary>
        /// 数字
        /// </summary>
        //[EnumItemDescription("数字", ShortName = "数字")]
        OI_NUMBER,

        /// <summary>
        /// 布尔型
        /// </summary>
        //[EnumItemDescription("布尔型", ShortName = "布尔型")]
        OI_BOOLEAN,

        /// <summary>
        /// 日期型
        /// </summary>
        //[EnumItemDescription("日期型", ShortName = "日期型")]
        OI_DATETIME,
    }


    /// <summary>
	/// 二叉树的节点
	/// </summary>
	/// 
	[Serializable]
    public sealed class ExpTreeNode : ISerializable
    {
        private ExpTreeNode left = null;
        private ExpTreeNode right = null;
        private int position = 0;
        private Operation_IDs operationID = Operation_IDs.OI_NONE;
        private Object nodeValue = null;
        private List<ExpTreeNode> functionParams = null;
        private string functionName = string.Empty;

        /// <summary>
        /// 重载实现二叉树的反序列化
        /// </summary>
        /// <param name="info">The object to be populated with serialization information.</param>
        /// <param name="context">The destination context of the serialization.</param>
        /// <remarks>
        /// 二叉树的反序列化
        /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="Serialization" lang="cs" />
        /// </remarks>
        public ExpTreeNode(SerializationInfo info, StreamingContext context)
        {
            this.left = (ExpTreeNode)info.GetValue("Left", typeof(ExpTreeNode));
            this.right = (ExpTreeNode)info.GetValue("Right", typeof(ExpTreeNode));
            this.position = info.GetInt32("Position");
            this.operationID = (Operation_IDs)info.GetInt16("OperationID");

            string valueTypeName = info.GetString("ValueType");
            if (valueTypeName != "NullValue")
            {
                this.nodeValue = (Object)info.GetValue("Value", Type.GetType(valueTypeName));
            }
            else
            {
                this.nodeValue = (Object)info.GetValue("Value", typeof(Object));
            }
            this.functionParams = (List<ExpTreeNode>)info.GetValue("Params", typeof(ExpTreeNode));
            this.functionName = info.GetString("FunctionName");
        }

        /// <summary>
        /// 重载GetObjectData实现二叉树的序列化
        /// </summary>
        /// <param name="info">The object to be populated with serialization information. </param>
        /// <param name="context">The destination context of the serialization. </param>
        /// <remarks>对二叉树实现序列化
        /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="Serialization" lang="cs" />
        /// </remarks>
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue("Left", this.left);
            info.AddValue("Right", this.right);
            info.AddValue("Position", this.position);
            info.AddValue("OperationID", this.operationID);
            if (this.nodeValue != null)
            {
                info.AddValue("ValueType", this.nodeValue.GetType().FullName);
            }
            else
            {
                info.AddValue("ValueType", "NullValue");
            }
            info.AddValue("Value", this.nodeValue);
            info.AddValue("Params", this.functionParams);
            info.AddValue("FunctionName", this.functionName);
        }

        internal ExpTreeNode()
        {
        }

        /// <summary>
        /// 二叉树的左子树
        /// </summary>
        public ExpTreeNode Left
        {
            get { return this.left; }
            internal set { this.left = value; }
        }


        /// <summary>
        /// 二叉树的右子树
        /// </summary>
        public ExpTreeNode Right
        {
            get { return this.right; }
            internal set { this.right = value; }
        }

        /// <summary>
        /// 二叉树所在结点在表达式中的绝对位置
        /// </summary>
        public int Position
        {
            get { return this.position; }
            internal set { this.position = value; }
        }

        /// <summary>
        /// 运算符
        /// </summary>
        public Operation_IDs OperationID
        {
            get { return this.operationID; }
            internal set { this.operationID = value; }//add By Yuanyong 20070418
        }

        /// <summary>
        /// 二叉树的值
        /// </summary>
        public Object Value
        {
            get { return this.nodeValue; }
            internal set { this.nodeValue = value; }
        }


        /// <summary>
        /// 二叉树结点函数的参数
        /// </summary>
        public List<ExpTreeNode> Params
        {
            get { return this.functionParams; }
            internal set { this.functionParams = value; }
        }

        /// <summary>
        /// 二叉树结点所代表的函数名
        /// </summary>
        public string FunctionName
        {
            get { return this.functionName; }
            internal set { this.functionName = value; }
        }
    }
    /// <summary>
	/// 
	/// </summary>
	public sealed class ParseIdentifier
    {
        private Operation_IDs operationID = Operation_IDs.OI_NONE;
        private string identifier = string.Empty;
        private int position = -1;
        private ParseIdentifier prevIdentifier = null;
        private ParseIdentifier nextIdentifier = null;
        private ParseIdentifier subIdentifier = null;
        private ParseIdentifier parentIdentifier = null;

        /// <summary>
        /// 标识符的类型
        /// </summary>
        public Operation_IDs OperationID
        {
            get { return this.operationID; }
            internal set { this.operationID = value; }
        }

        /// <summary>
        /// 标识符的文本
        /// </summary>
        public string Identifier
        {
            get { return this.identifier; }
            internal set { this.identifier = value; }
        }

        /// <summary>
        /// 标识符的类型
        /// </summary>
        public int Position
        {
            get { return this.position; }
            internal set { this.position = value; }
        }

        /// <summary>
        /// 前一个标识符
        /// </summary>
        public ParseIdentifier PrevIdentifier
        {
            get { return this.prevIdentifier; }
            internal set { this.prevIdentifier = value; }
        }

        /// <summary>
        /// 后一个标识符
        /// </summary>
        public ParseIdentifier NextIdentifier
        {
            get { return this.nextIdentifier; }
            internal set { this.nextIdentifier = value; }
        }

        /// <summary>
        /// 子标识符
        /// </summary>
        public ParseIdentifier SubIdentifier
        {
            get { return this.subIdentifier; }
            internal set { this.subIdentifier = value; }
        }

        /// <summary>
        /// 父标识符
        /// </summary>
        public ParseIdentifier ParentIdentifier
        {
            get { return this.parentIdentifier; }
            internal set { this.parentIdentifier = value; }
        }

        /// <summary>
        /// 输出内容
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            StringBuilder strB = new StringBuilder();

            using (StringWriter writer = new StringWriter(strB))
            {
                WriteIdentifierInfoRecursively(writer);
                /*
				ParseIdentifier identifier = this;

				while (identifier != null)
				{
					identifier.WriteIdentifierInfoRecursively(writer, 0);

					identifier = identifier.NextIdentifier;
				}*/
            }

            return strB.ToString();
        }

        private void WriteIdentifierInfoRecursively(StringWriter writer, int indent = 0)
        {
            ParseIdentifier identifier = this;

            while (identifier != null)
            {
                identifier.WriteIdentifierInfo(writer);

                indent++;

                if (identifier.SubIdentifier != null)
                    identifier.SubIdentifier.WriteIdentifierInfoRecursively(writer, indent);

                indent--;

                identifier = identifier.NextIdentifier;
            }
        }

        private void WriteIdentifierInfo(StringWriter writer, int indent = 0)
        {
            string tab = new string(' ', indent);

            writer.WriteLine("{0}'{1}': OpID={2}, Position={3}", tab, Identifier, OperationID, Position);
        }

        internal ParseIdentifier()
        {
        }

        internal ParseIdentifier(Operation_IDs oID, string strID, int nPos, ParseIdentifier prev)
        {
            this.operationID = oID;
            this.identifier = strID;
            this.position = nPos;
            this.prevIdentifier = prev;
        }


    }


    /// <summary>
    /// 用户自定义函数传入的参数
    /// </summary>
    /// <remarks>
    /// 用户传入的参数对象
    /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="UserDefinedFucntions" lang="cs" />
    /// </remarks>
    public sealed class ParamObject
    {
        private object paramValue = null;
        private int position = -1;
        private int paramIndex = 0;

        internal ParamObject(object v, int nPos, int paramIndex)
        {
            this.paramValue = v;
            this.position = nPos;
            this.paramIndex = paramIndex;
        }

        /// <summary>
        /// 参数值
        /// </summary>
        public object Value
        {
            get { return this.paramValue; }
            internal set { this.paramValue = Value; }
        }

        /// <summary>
        /// 参数在表达式中的位置
        /// </summary>
        public int Position
        {
            get { return this.position; }
            internal set { this.position = value; }
        }

        /// <summary>
        /// 是第几个参数
        /// </summary>
        public int ParamIndex
        {
            get { return this.paramIndex; }
            internal set { this.paramIndex = value; }
        }

        /// <summary>
        /// 检查参数的类型
        /// </summary>
        /// <typeparam name="T">参数是否是指定类型，或者是它的派生类</typeparam>
        /// <remarks>
        /// 检查参数类型是否为指定类型
        /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="UserDefinedFucntions" lang="cs" />
        /// </remarks>
        public void CheckParameterType<T>()
        {
            if (this.Value != null)
            {
                System.Type expectedType = typeof(T);

                //bool temp = !(this.Value.GetType().IsSubclassOf(expectedType) || this.Value.GetType() == expectedType);

                if (false == (this.Value.GetType().IsSubclassOf(expectedType) || this.Value.GetType() == expectedType))
                {
                    throw ParsingException.NewParsingException(ParseError.InvalidParameterType, 0, expectedType.Name, this.Value.GetType().Name);
                }
            }
        }
    }


    /// <summary>
	/// 参数类型的集合
	/// </summary>
	/// <remarks>
	/// 用户自定义函数传入的参数集合
	/// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="UserDefinedFucntions" lang="cs" />
	/// </remarks>
	public sealed class ParamObjectCollection : ReadOnlyCollection<ParamObject>
    {
        internal ParamObjectCollection(List<ParamObject> list)
            : base(list)
        {
        }

        /// <summary>
        /// 取参数集合中的参数
        /// </summary>
        /// <param name="i">第几个次序</param>
        /// <returns>返回参数，类型为ParamObject</returns>
        public new ParamObject this[int i]
        {
            get { return base[i]; }
        }

        /// <summary>
        /// 检查参数的个数
        /// </summary>
        /// <param name="nLimit">参数的最小个数</param>
        public void CheckParamsLength(int nLimit)
        {
            ExceptionHelper.FalseThrow(this.Count >= nLimit, Resources.InvalidParamsCount, nLimit);
        }
    }


    /// <summary>
	/// 表达式分析的结果
	/// </summary>
	/// <remarks>
	/// 表达式分析后产生的结果
	/// </remarks>
	public sealed class ParseResult
    {
        private ExpTreeNode tree = null;
        private ParseIdentifier identifiers = null;

        internal ParseResult(ExpTreeNode tree, ParseIdentifier identifiers)
        {
            this.tree = tree;
            this.identifiers = identifiers;
        }

        private ParseResult()
        {
        }

        /// <summary>
        /// 取解析出的二叉树
        /// </summary>
        public ExpTreeNode Tree
        {
            get { return this.tree; }
        }

        /// <summary>
        /// 标识符
        /// </summary>
        public ParseIdentifier Identifiers
        {
            get { return this.identifiers; }
        }
    }


    public class ExpClass
    {
        /// <summary>
        /// 用户自定义函数的委托定义
        /// </summary>
        /// <param name="funcName">用户自定义函数名</param>
        /// <param name="arrParams">参数数组</param>
        /// <param name="callerContext">调用上下文</param>
        /// <returns>计算结果</returns>
        /// <remarks>
        /// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Expression\ExpressionParserTest.cs" region="UserDefinedFucntions" lang="cs" title="用户自定义函数的范例" />
        /// </remarks>
        public delegate object CalculateUserFunction(string funcName, ParamObjectCollection arrParams, object callerContext);
  
    }
}
