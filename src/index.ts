import * as Bundler from 'parcel-bundler';
import * as path from 'path'

console.log('Welcome to Endeavor');

// Single entrypoint file location:
const entryFiles = path.join(__dirname, '../samples/helloworld/index.html');
console.log(`entryFiles: ${entryFiles}`);

const outputDirectory = './site'
const outputFile = 'index.html'

// Bundler options
const options:Bundler.ParcelOptions = {
    outDir: outputDirectory, // The out directory to put the build files in, defaults to dist
    outFile: outputFile, // The name of the outputFile
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
};
  
(async function() {
    // Initializes a bundler using the entrypoint location and options provided
    const bundler:Bundler | any = new Bundler(entryFiles, options);
  
    // Run the bundler, this returns the main bundle
    const bundle = await bundler.bundle();
    try {
        console.log(`bundle creating ${bundle.assets.size} file(s)`);
    } catch (error) {
        console.error(`Bundle Error: ${error}`)
    }
    
    console.log("All Done");
  })();