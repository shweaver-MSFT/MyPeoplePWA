using System;
using WebView.Interop.UWP;

namespace MyPeopleUWA
{
    sealed partial class App : HybridWebApplication
    {
        static void Main(string[] args)
        {
            Start(_ => new App());
        }

        public App() : base(new Uri("ms-appx-web:///index.html")) { }
    }
}

