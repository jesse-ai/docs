# Directory Structure

After initially creating a project with Jesse, this will be your project's folder structure: 

::: vue
.
├── config
│   ├── `app.ts`
│   ├── `exchanges.ts`
│   ├── `logging.ts`
│   ├── `notifications.ts`
│   ├── `dashboard.ts`
│   └── `indicators.ts`
│  
├── strategies
│   ├── `Strategy.ts`
│   │
│   └── Strategy01
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── Strategy01.test.ts
│   │
│   └── Strategy02
│       ├── index.ts
│       ├── types.ts
│       └── Strategy02.test.ts
│ 
└── storage
│   ├── logs
│   └── candles
│   
└── core
│   
└── index.ts
└── package.json
└── LICENSE
└── tsconfig.json
└── `.env`
:::

- `/core`: Contains the main code of Jesse framework. To keep your source code maintainable, as you will need to update to newer versions in the future, DO NOT change the code at this directory. 