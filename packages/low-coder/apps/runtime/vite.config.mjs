import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  // 设置资源路径的公共前缀
  base: '/runtime/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // 必须配置为 UMD 格式
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // 避免 chunk 哈希影响主应用加载
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    // 关闭拆包优化（可选）
    minify: false,
  },
});
