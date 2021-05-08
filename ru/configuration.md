# Конфигурация

Файл конфигурации расположен в корне вашего проекта и называется`config.py`.

Он содержит значения конфигурации для баз данных, бирж, журналов и уведомлений. Комментарии каждого раздела довольно ясны.

Пример файла конфигурации:

```py
config = {
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # PostgreSQL База данных
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # PostgreSQL используется в качестве базы данных для хранения данных, таких как свечи.
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'databases': {
        'postgres_host': '127.0.0.1',
        'postgres_name': 'jesse_db',
        'postgres_port': 5432,
        'postgres_username': 'jesse_user',
        'postgres_password': 'password',
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Кэширование
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # В некоторых случаях, таких как загрузка свечей в режиме бэктеста,
    # механизм кэширования используется, чтобы справляться с нагрузкой быстрее.
    # Допустимые варианты (до сих пор): 'pickle', None
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'caching': {
        'driver': 'pickle'
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Биржи
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # Ниже значения используются для обменов.
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'exchanges': {
        # https://www.bitfinex.com
        'Bitfinex': {
            'fee': 0.002,

            # только режим бектеста: принимает значение 'spot' или 'futures'
            'type': 'futures',

            # только для режима futures
            'settlement_currency': 'USD',
            # принимаемые значения: 'cross' и 'isolated'
            'futures_leverage_mode': 'cross',
            # 1x, 2x, 10x, 50x, etc. Заполняется цифрами
            'futures_leverage': 1,

            'assets': [
                {'asset': 'USDT', 'balance': 10_000},
                {'asset': 'USD', 'balance': 10_000},
                {'asset': 'BTC', 'balance': 0},
            ],
        },

        # https://www.binance.com
        'Binance': {
            'fee': 0.001,

            # только режим бектеста: принимает значение 'spot' или 'futures'
            'type': 'futures',

            # только для режима futures
            'settlement_currency': 'USDT',
            # принимаемые значения: 'cross' и 'isolated'
            'futures_leverage_mode': 'cross',
            # 1x, 2x, 10x, 50x, etc. Заполняется цифрами
            'futures_leverage': 1,

            'assets': [
                {'asset': 'USDT', 'balance': 10_000},
                {'asset': 'BTC', 'balance': 0},
            ],
        },

        # https://www.binance.com
        'Binance Futures': {
            'fee': 0.0004,

            # только режим бектеста: принимает значение 'spot' или 'futures'
            'type': 'futures',

            # только для режима futures
            'settlement_currency': 'USDT',
            # принимаемые значения: 'cross' и 'isolated'
            'futures_leverage_mode': 'cross',
            # 1x, 2x, 10x, 50x, etc. Заполняется цифрами
            'futures_leverage': 1,

            'assets': [
                {'asset': 'USDT', 'balance': 10_000},
            ],
        },

        # https://testnet.binancefuture.com
        'Testnet Binance Futures': {
            'fee': 0.0004,

            # только режим бектеста: принимает значение 'spot' или 'futures'
            'type': 'futures',

            # только для режима futures
            'settlement_currency': 'USDT',
            # принимаемые значения: 'cross' и 'isolated'
            'futures_leverage_mode': 'cross',
            # 1x, 2x, 10x, 50x, etc. Заполняется цифрами
            'futures_leverage': 1,

            'assets': [
                {'asset': 'USDT', 'balance': 10_000},
            ],
        },

        # https://pro.coinbase.com
        'Coinbase': {
            'fee': 0.005,

            # только режим бектеста: принимает значение 'spot' или 'futures'
            'type': 'futures',

            # только для режима futures
            'settlement_currency': 'USD',
            # принимаемые значения: 'cross' и 'isolated'
            'futures_leverage_mode': 'cross',
            # 1x, 2x, 10x, 50x, etc. Заполняется цифрами
            'futures_leverage': 1,

            'assets': [
                {'asset': 'USDT', 'balance': 10_000},
                {'asset': 'USD', 'balance': 10_000},
                {'asset': 'BTC', 'balance': 0},
            ],
        },
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Логирование
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # Ниже параметры используемые для отфильтровывания данных в журналах
    # информация, отображаемая, когда "--debug" флаг включен.
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'logging': {
        'order_submission': True,
        'order_cancellation': True,
        'order_execution': True,
        'position_opened': True,
        'position_increased': True,
        'position_reduced': True,
        'position_closed': True,
        'shorter_period_candles': False,
        'trading_candles': True,
        'balance_update': True,
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Метрики
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # Ниже приведены параметры для установки метрик
    # которые отображаются после бэктеста.
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'metrics': {
        'sharpe_ratio': True,
        'calmar_ratio': False,
        'sortino_ratio': False,
        'omega_ratio': False,
        'winning_streak': False,
        'losing_streak': False,
        'largest_losing_trade': False,
        'largest_winning_trade': False,
        'total_winning_trades': False,
        'total_losing_trades': False,
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Режим оптимизации
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # Ниже конфигурации связаны с режимом оптимизации
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'optimization': {
        # sharpe, calmar, sortino, omega
        'ratio': 'sharpe',
    },

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Данные
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # Ниже конфигурации связаны с данными
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    'data': {
        # Минимальное количество разогравных свечей, загруженных перед каждым сеансом.
        'warmup_candles_num': 210,
    }
}
```
