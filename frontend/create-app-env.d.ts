// 三斜线指令 代表你这个ts项目所要用到的所有的类型声明
/// <reference types="react-scripts" />

interface Window {
    a: string
}

declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number
    }
}

// 只要在d.ts里面写了任何接口 都是会直接进行覆盖的