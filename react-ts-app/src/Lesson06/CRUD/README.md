# API

## API: Get all customers

- Url: <https://server.aptech.io/online-shop/customers>
- Method: GET

## API: Get customer by Id

Url: <https://server.aptech.io/online-shop/customers/1>
Method: GET

## API: Create new customer

- Url: <https://server.aptech.io/online-shop/customers>
- Method: POST
- Body (JSON):

```json
{
        "firstName": "Nguyễn",
        "lastName": "Tuấn",
        "phoneNumber": "+84987898789",
        "address": "123 Dong Da",
        "birthday": "2025-01-10",
        "email": "ghghgh@gmail.com"
}
```

## API: Update exists customer

- Url: <https://server.aptech.io/online-shop/customers/1>
- Method: PATCH
- Body (JSON):

```json
{
        "firstName": "Nguyễn",
        "lastName": "Tuấn",
        "phoneNumber": "+84987898789",
        "address": "123 Dong Da",
        "birthday": "2025-01-10",
        "email": "ghghgh@gmail.com"
}
```

## API: Delete exists customer

- Url: <https://server.aptech.io/online-shop/customers/1>
- Method: DELETE
