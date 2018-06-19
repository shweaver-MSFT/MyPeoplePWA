using System;
using System.Threading.Tasks;
using WebView.Interop.UWP;
using Windows.ApplicationModel;
using Windows.Storage;

namespace MyPeopleUWA
{
    sealed partial class App : HybridWebApplication
    {
        static void Main(string[] args)
        {
            // Transfer all Web content to local cache folder.
            // TODO: Consider clearing the cache first. May not be necessary
            var webFolder = Package.Current.InstalledLocation.GetFolderAsync("Web").GetAwaiter().GetResult();
            var destinationFolder = ApplicationData.Current.LocalCacheFolder;
            RecursiveCopy(webFolder, destinationFolder).GetAwaiter().GetResult();

            Start(_ => new App());
        }

        public App() : base(new Uri("Web/index.html")) { }

        private static async Task RecursiveCopy(IStorageItem storageItem, IStorageFolder destinationFolder)
        {
            if (storageItem is StorageFolder)
            {
                var temp = await destinationFolder.CreateFolderAsync(storageItem.Name, CreationCollisionOption.ReplaceExisting);
                var items = await (storageItem as StorageFolder).GetItemsAsync();
                foreach (var item in items)
                {
                    await RecursiveCopy(item, temp);
                }
            }
            else if (storageItem is StorageFile)
            {
                await (storageItem as StorageFile).CopyAsync(destinationFolder, storageItem.Name, NameCollisionOption.ReplaceExisting);
            }
        }
    }
}

