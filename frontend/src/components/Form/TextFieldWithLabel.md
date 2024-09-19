# TextFieldWithLabel Component

## Descrição

O componente `TextFieldWithLabel` é um campo de entrada de texto estilizado que inclui um rótulo (`label`) acima do campo. Ele é utilizado para capturar a entrada de dados do usuário, oferecendo uma interface clara e acessível.

## Props

### `name`

- **Tipo**: `string`
- **Descrição**: O nome do campo de entrada. É usado para identifivehicle o campo no formulário e enviar o valor ao submeter o formulário.
- **Exemplo**: `"title"`

### `value`

- **Tipo**: `string | number`
- **Descrição**: O valor atual do campo de entrada. Pode ser um texto ou um número, dependendo do tipo de campo.
- **Exemplo**: `"Título"`

### `onChange`

- **Tipo**: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- **Descrição**: Função chamada quando o valor do campo de entrada é alterado. Recebe um evento de mudança do `TextField` e deve atualizar o estado do formulário.
- **Exemplo**:
  ```jsx
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
