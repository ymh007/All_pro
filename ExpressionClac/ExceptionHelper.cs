using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Text;

namespace ExpressionClac
{

    public class SystemSupportException: ApplicationException
    {
        /// <summary>
        /// SystemSupportException的缺省构造函数
        /// </summary>
        /// <remarks>SystemSupportException的缺省构造函数.
        /// </remarks>
        public SystemSupportException()
        {
        }

        /// <summary>
        /// SystemSupportException的带错误消息参数的构造函数
        /// </summary>
        /// <param name="strMessage">错误消息串</param>
        /// <remarks>SystemSupportException的带错误消息参数的构造函数,该错误消息将在消息抛出异常时显示出来。
        /// <seealso cref="MCS.Library.Expression.ExpTreeExecutor"/>
        /// </remarks>
        public SystemSupportException(string strMessage)
            : base(strMessage)
        {
        }

        /// <summary>
        /// SystemSupportException的构造函数。
        /// </summary>
        /// <param name="strMessage">错误消息串</param>
        /// <param name="ex">导致该异常的异常</param>
        /// <remarks>该构造函数把导致该异常的异常记录了下来。
        /// </remarks>
        public SystemSupportException(string strMessage, Exception ex)
            : base(strMessage, ex)
        {
        }

        /// <summary>
        /// 用序列化数据初始化<see cref="SystemSupportException"/>的新实例。
        /// </summary>
        /// <param name="info">保存序列化对象数据的对象。</param>
        /// <param name="context">有关源或目标的上下文信息。</param>
        protected SystemSupportException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }

   public static class ExceptionHelper
    {
        /// <summary>
		/// 如果条件表达式boolExpression的结果值为假（false），则抛出strMessage指定的错误信息
		/// </summary>
		/// <param name="parseExpressionResult">条件表达式</param>
		/// <param name="message">错误信息</param>
		/// <param name="messageParams">错误信息参数</param>
		/// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Core\ExceptionsTest.cs" region = "FalseThrowTest" lang="cs" title="通过判断条件表达式boolExpression的结果值而判断是否抛出指定的异常信息" />
		/// <seealso cref="TrueThrow"/>
		/// <seealso cref="MCS.Library.Logging.LoggerFactory"/>
		/// <remarks>
		/// 如果条件表达式boolExpression的结果值为假（false），则抛出message指定的错误信息
		/// </remarks>
		/// <example>
		/// <code>
		/// ExceptionTools.FalseThrow(name != string.Empty, "对不起，名字不能为空！");
		/// </code>
		/// </example>
		[DebuggerNonUserCode]
        public static void FalseThrow(this bool parseExpressionResult, string message, params object[] messageParams)
        {
            TrueThrow(false == parseExpressionResult, message, messageParams);
        }


        /// <summary>
		/// 如果条件表达式boolExpression的结果值为真(true)，则抛出strMessage指定的错误信息
		/// </summary>
		/// <param name="parseExpressionResult">条件表达式</param>
		/// <param name="message">错误信息</param>
		/// <param name="messageParams">错误信息参数</param>
		/// <remarks>
		/// 如果条件表达式boolExpression的结果值为真(true)，则抛出strMessage指定的错误信息
		/// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Core\ExceptionsTest.cs"  lang="cs" title="通过判断条件表达式boolExpression的结果值而判断是否抛出指定的异常信息" />
		/// <seealso cref="FalseThrow"/>
		/// <seealso cref="MCS.Library.Compression.ZipReader"/>
		/// </remarks>
		/// <example>
		/// <code>
		/// ExceptionTools.TrueThrow(name == string.Empty, "对不起，名字不能为空！");
		/// </code>
		/// </example>
		[DebuggerNonUserCode]
        public static void TrueThrow(this bool parseExpressionResult, string message, params object[] messageParams)
        {
            TrueThrow<SystemSupportException>(parseExpressionResult, message, messageParams);
        }


        /// <summary>
		/// 如果条件表达式boolExpression的结果值为真(true)，则抛出strMessage指定的错误信息
		/// </summary>
		/// <param name="parseExpressionResult">条件表达式</param>
		/// <param name="message">错误信息</param>
		/// <param name="messageParams">错误信息的参数</param>
		/// <typeparam name="T">异常的类型</typeparam>
		/// <remarks>
		/// 如果条件表达式boolExpression的结果值为真(true)，则抛出message指定的错误信息
		/// <code source="..\Framework\TestProjects\DeluxeWorks.Library.Test\Core\ExceptionsTest.cs" region = "TrueThrowTest" lang="cs" title="通过判断条件表达式boolExpression的结果值而判断是否抛出指定的异常信息" />
		/// <seealso cref="FalseThrow"/>
		/// <seealso cref="MCS.Library.Logging.LogEntity"/>
		/// </remarks>
		[DebuggerNonUserCode]
        public static void TrueThrow<T>(this bool parseExpressionResult, string message, params object[] messageParams) where T : System.Exception
        {
            if (parseExpressionResult)
            {
                if (message == null)
                    throw new ArgumentNullException("message");

                Type exceptionType = typeof(T);

                Object obj = Activator.CreateInstance(exceptionType);

                Type[] types = new Type[1];
                types[0] = typeof(string);

                ConstructorInfo constructorInfoObj = exceptionType.GetConstructor(
                    BindingFlags.Instance | BindingFlags.Public, null,
                    CallingConventions.HasThis, types, null);

                Object[] args = new Object[1];

                args[0] = string.Format(message, messageParams);

                constructorInfoObj.Invoke(obj, args);

                throw (Exception)obj;
            }
        }

    }
}
