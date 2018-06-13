using WebView.Interop;

namespace MyPeopleUWA
{
    /// <summary>
    /// App entry point
    /// </summary>
    sealed partial class App
    {
        static void Main(string[] args)
        {
            Start(_ => new HybridWebApplication(new System.Uri("ms-appx-web:///Web/index.html")));
        }
    }
}