import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/frontend-js/pages');
const astroPagesDir = path.join(process.cwd(), 'src/pages');

// Ensure pages dir exists
if (!fs.existsSync(astroPagesDir)) {
    fs.mkdirSync(astroPagesDir, { recursive: true });
}

// Function to recursively find tsx files
function findTsxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findTsxFiles(filePath, fileList);
        } else if (filePath.endsWith('.tsx') && !file.startsWith('_')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const tsxFiles = findTsxFiles(pagesDir);

for (const filePath of tsxFiles) {
    // Relative path from pagesDir
    const relPath = path.relative(pagesDir, filePath);
    // e.g. "auth/login.tsx" or "welcome.tsx"
    
    const parsed = path.parse(relPath);
    // If it's welcome.tsx, map it to index.astro. Otherwise keep the same path.
    const isWelcome = parsed.name === 'welcome' && parsed.dir === '';
    
    const astroFileName = isWelcome ? 'index.astro' : `${parsed.name}.astro`;
    const astroFilePath = path.join(astroPagesDir, parsed.dir, astroFileName);
    
    // Ensure nested dir exists
    if (parsed.dir) {
        fs.mkdirSync(path.join(astroPagesDir, parsed.dir), { recursive: true });
    }
    
    // Convert Windows backslashes to forward slashes for the import path
    const importPath = `@/pages/${relPath.replace(/\\/g, '/').replace('.tsx', '')}`;
    const componentName = parsed.name.charAt(0).toUpperCase() + parsed.name.slice(1).replace(/[^a-zA-Z0-9]/g, '');

    const astroContent = `---
import ${componentName} from '${importPath}';
import '@/../frontend-css/app.css';
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>NO CAP</title>
	</head>
	<body class="antialiased">
		<${componentName} client:load />
	</body>
</html>
`;

    fs.writeFileSync(astroFilePath, astroContent, 'utf8');
    console.log(`Created ${astroFilePath}`);
}

// Also create inertia mock
const libDir = path.join(process.cwd(), 'src/lib');
if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
}
const mockContent = `import React from 'react';

export const Head = ({ title }: { title?: string }) => {
    if (typeof document !== 'undefined' && title) {
        document.title = title;
    }
    return null;
};

export const Link = React.forwardRef(({ href, children, className, preserveScroll, preserveState, ...props }: any, ref) => {
    // Basic a tag wrapper for inertia Link
    let actualHref = href;
    if (typeof href === 'object' && href !== null) {
        // sometimes route() returns an object in custom setups, but Wayfinder usually returns strings
        actualHref = href.url || '#';
    }
    return <a href={actualHref} className={className} ref={ref} {...props}>{children}</a>;
});
Link.displayName = 'Link';

export const usePage = () => ({
    props: {
        auth: { user: null },
        errors: {},
        flash: {}
    },
    url: typeof window !== 'undefined' ? window.location.pathname : '/'
});

export const useForm = (initialData: any) => {
    const [data, setData] = React.useState(initialData);
    const [processing, setProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    return {
        data,
        setData: (keyOrData: any, value?: any) => {
            if (typeof keyOrData === 'string') {
                setData((prev: any) => ({ ...prev, [keyOrData]: value }));
            } else if (typeof keyOrData === 'function') {
                setData((prev: any) => keyOrData(prev));
            } else {
                setData(keyOrData);
            }
        },
        post: (url: string) => { console.log('POST', url, data); },
        put: (url: string) => { console.log('PUT', url, data); },
        delete: (url: string) => { console.log('DELETE', url, data); },
        processing,
        errors,
        reset: () => setData(initialData),
        clearErrors: () => setErrors({}),
    };
};

export const router = {
    get: (url: string) => { if (typeof window !== 'undefined') window.location.href = url; },
    post: (url: string) => { console.log('router.post', url); },
    put: (url: string) => { console.log('router.put', url); },
    delete: (url: string) => { console.log('router.delete', url); },
    visit: (url: string) => { if (typeof window !== 'undefined') window.location.href = url; },
};
`;

fs.writeFileSync(path.join(libDir, 'inertia-mock.tsx'), mockContent, 'utf8');
console.log('Created inertia mock');
