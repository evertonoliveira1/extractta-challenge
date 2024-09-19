# SelectWithLabel Component

## Descrição

O componente `SelectWithLabel` é um menu suspenso estilizado que permite ao usuário selecionar uma opção de uma lista. Ele é envolvido em um `FormControl` e inclui um rótulo (`label`) para melhor acessibilidade e compreensão.

## Props

### `name`

- **Tipo**: `string`
- **Descrição**: O nome do campo de seleção. É usado para identifivehicle o campo no formulário e é enviado com o valor selecionado ao submeter o formulário.
- **Exemplo**: `"state"`

### `value`

- **Tipo**: `string`
- **Descrição**: O valor atualmente selecionado no menu suspenso. Deve corresponder a um dos valores das opções fornecidas na prop `items`.
- **Exemplo**: `"SP"`

### `onChange`

- **Tipo**: `(event: SelectChangeEvent<string>) => void`
- **Descrição**: Função chamada quando o valor selecionado no menu suspenso é alterado. Recebe um evento de mudança do `Select` e deve atualizar o estado do formulário.
- **Exemplo**:
  ```jsx
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
