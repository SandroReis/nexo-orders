## Observações

- Existe um swagger rodando localhost:8080/
- Foi criado uma rota de criar clientes
- Foi criado uma rota para criar os pedidos

O banco utilizado é o sqlite3 e assim que rodar o ambiente de dev o banco será criado

<strong>Importante</strong>: é necessário criar os produtos no banco!!!

para rodar a aplicação execute `npm install && npm run start:dev`

## Descrição

Vamos criar um endpoint para registrar os pedidos de um usuário.

Regras:

1. Cada pedido deve conter ao menos 1 produto;
2. Não é possível criar o pedido caso a quantidade atual do produto esteja menor do que o solicitado;
3. Não é possível criar um pedido para um cliente que não existe;
4. Não é possível utilizar um produto que não existe.

---

Entidades:

```tsx
interface Client {
	clientId: number;
	name: string;
}

interface Order {
	orderId: number;
	products: Array<Product>;
	status: string;
}

interface Product {
	productId; number;
	isActive: boolean;
	currentQuantity; number;
}
```

cURL:

```bash
curl --request POST \
  --url http://localhost:8080/api/order \
  --header 'Content-Type: application/json' \
  --data '{
	"clientId": 1,
	"products": [
		{
			"productId": 1,
			"quantity": 1
		},
		{
			"productId": 2,
			"quantity": 3
		},
		{
			"productId": 1,
			"quantity": 3
		}
	]
}'
```