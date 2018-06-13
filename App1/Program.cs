namespace App1
{
    public class Program : SuperProgram
    {
        static void Main(string[] args)
        {
            Start(_ => new Program());
        }
    }

    public class SuperProgram : Windows.UI.Xaml.Application
    {
        protected override void OnLaunched(Windows.ApplicationModel.Activation.LaunchActivatedEventArgs args)
        {
            base.OnLaunched(args);

            Windows.UI.Xaml.Window.Current.Content = new Windows.UI.Xaml.Controls.TextBlock
            {
                Text = "Hello world!",
                VerticalAlignment = Windows.UI.Xaml.VerticalAlignment.Center,
                HorizontalAlignment = Windows.UI.Xaml.HorizontalAlignment.Center,
                FontSize = 40
            };
            Windows.UI.Xaml.Window.Current.Activate();
        }
    }
}
