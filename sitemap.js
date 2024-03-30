const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

const baseUrl = 'https://flexiver.com.au'; // Your website URL
const outputPath = path.join(__dirname, 'public', 'sitemap.xml'); // Output path for the sitemap file

// Function to recursively traverse directory and collect URLs
function traverseDirectory(directory, urls = []) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            traverseDirectory(filePath, urls);
        } else if (file.endsWith('.tsx')) {
            // Assuming React routes are defined in .tsx files
            const relativePath = path.relative(path.join(__dirname, 'src'), filePath);
            const url = `${baseUrl}/${relativePath.replace('.tsx', '')}`;
            urls.push({ url, changefreq: 'weekly', priority: 0.5 }); // You can adjust changefreq and priority according to your needs
        }
    });

    return urls;
}

// Generate sitemap
const urls = traverseDirectory(path.join(__dirname, 'src'));
const stream = new SitemapStream({ hostname: baseUrl });

urls.forEach(url => {
    stream.write(url);
});

stream.end();

// Pipe the stream to a writable file stream
streamToPromise(stream).then(sm => {
    fs.writeFileSync(outputPath, sm.toString());
    console.log('Sitemap generated successfully!');
}).catch(err => {
    console.error('Error generating sitemap:', err);
});
