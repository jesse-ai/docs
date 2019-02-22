# Directory Structure

After initially creating a project with Jesse, this will be your project's folder structure: 

::: vue
.
├── config
│   ├── app.ts
│   ├── exchanges.ts
│   ├── logging.ts
│   ├── notifications.ts
│   ├── dashboard.ts
│   └── indicators.ts
│  
├── strategies
│   ├── Strategy.ts
│   └── DefaultStrategy
│       ├── index.ts
│       ├── types.ts
│       └── DefaultStrategy.test.ts
│ 
└── storage
│   ├── logs
│   └── candles
│   
└── index.ts
└── bootstrap.ts
└── package.json
└── LICENSE
└── tsconfig.json
└── .env
:::