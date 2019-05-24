using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskScheduler;
namespace MyTaskJob
{
    class Program
    {
        static void Main(string[] args)
        {
            TaskSchedulerClass scheduler = new TaskSchedulerClass();
            scheduler.Connect(null, null, null, null);

            ITaskDefinition task = scheduler.NewTask(0);
            task.Settings.ExecutionTimeLimit = "PT0S";
            task.RegistrationInfo.Author = "Author";
            task.RegistrationInfo.Description = "New Task";
            //task.Settings.RunOnlyIfIdle = true;

            IDailyTrigger trigger = (IDailyTrigger)task.Triggers.Create(_TASK_TRIGGER_TYPE2.TASK_TRIGGER_TIME);
            trigger.Repetition.Interval ="1";
            trigger.Id = "DailyTrigger";
            trigger.StartBoundary = "2019-04-09T16:30:00";
            trigger.EndBoundary = "2059-01-31T12:00:00";

            IExecAction action = (IExecAction)task.Actions.Create(_TASK_ACTION_TYPE.TASK_ACTION_EXEC);
            action.Path = "all_andy.exe";

           ITaskFolder folder = scheduler.GetFolder("\\");
            IRegisteredTask regTask = folder.RegisterTaskDefinition(
                "Test",
                task,
                (int)_TASK_CREATION.TASK_CREATE,
                null, //user
                null, // password
                _TASK_LOGON_TYPE.TASK_LOGON_INTERACTIVE_TOKEN,
                "");

            IRunningTask runTask = regTask.Run(null);

            Console.WriteLine("添加成功");
        }
    }
}
