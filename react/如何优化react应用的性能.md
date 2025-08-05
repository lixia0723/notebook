# react应用性能优化

**rerender**

不可变数据结构：immutable、immer(Proxy实现，控制更新的粒度)

组件异步加载：React.lazy、Suspense、import() ->分chunk

ReactMemo、useCallback使用

performance详细分析



1.打包构建：terser、chunk、tree-shakig、构建缓存

2.应用层面：transform优化reflow、webworker

3.资源加载：压缩gzip、字体压缩（font-spider）、oss、http2（缓存、长连接、多路复用）

4.首屏资源：Next、prefetch、首屏