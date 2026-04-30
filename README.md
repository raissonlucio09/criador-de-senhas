# Gerador Inteligente de Senhas

O **Gerador Inteligente de Senhas** é um projeto front-end simples, moderno e totalmente funcional criado com **HTML, CSS e JavaScript puro**. A aplicação permite gerar senhas seguras de forma rápida, configurar os tipos de caracteres usados, evitar caracteres ambíguos, visualizar uma estimativa de força e copiar o resultado para a área de transferência.

![Prévia do projeto](assets/screenshot.png)

## Sobre o projeto

Este projeto foi pensado para servir como um repositório inicial de qualidade para GitHub. A proposta é demonstrar uma interface bem alinhada, código organizado em módulos e uma funcionalidade real, sem resultados falsos ou valores fixos. A geração de senha usa a API `crypto.getRandomValues`, disponível nos navegadores modernos, para produzir números aleatórios mais adequados do que `Math.random` em cenários de geração de senhas.

| Critério | Implementação |
|---|---|
| **UI decente** | Layout responsivo, tipografia consistente, espaçamento regular, cards alinhados e estados visuais claros. |
| **Código organizado** | JavaScript separado em módulos pequenos: geração, força da senha, cópia e controle da interface. |
| **Funcionalidade real** | Senhas geradas dinamicamente com opções customizáveis e cálculo de força baseado em entropia estimada. |
| **README completo** | Descrição, imagem, recursos, estrutura de pastas e instruções para rodar localmente. |

## Funcionalidades

A aplicação oferece uma experiência rápida e direta para gerar senhas. O usuário pode alterar o tamanho da senha, ativar ou desativar letras maiúsculas, letras minúsculas, números e símbolos, além de remover caracteres visualmente ambíguos como `O`, `0`, `I`, `l` e `1`. Cada alteração atualiza automaticamente a senha e a avaliação de força.

| Recurso | Descrição |
|---|---|
| **Geração automática** | Cria uma nova senha assim que as opções mudam ou quando o botão principal é acionado. |
| **Opções customizáveis** | Permite escolher tamanho e tipos de caracteres usados na senha. |
| **Resultado copiável** | Copia a senha gerada com um clique usando a Clipboard API, com fallback para navegadores antigos. |
| **Indicador de força** | Mostra força estimada com rótulo, barra visual e recomendação textual. |
| **Design responsivo** | Funciona bem em telas grandes, tablets e celulares. |

## Tecnologias utilizadas

O projeto utiliza apenas tecnologias nativas do navegador. Isso facilita a publicação no GitHub Pages e evita dependências desnecessárias para um projeto inicial.

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da página e controles acessíveis. |
| **CSS3** | Layout responsivo, variáveis, cards, espaçamento e estados visuais. |
| **JavaScript ES Modules** | Separação da lógica em arquivos pequenos e reutilizáveis. |
| **Web Crypto API** | Geração de números aleatórios para compor as senhas. |
| **Clipboard API** | Cópia rápida do resultado para a área de transferência. |

## Estrutura de pastas

```txt
gerador-inteligente/
├── assets/
│   └── screenshot.png
├── src/
│   ├── app.js
│   ├── clipboard.js
│   ├── passwordGenerator.js
│   ├── strengthMeter.js
│   └── styles.css
├── index.html
└── README.md
```

## Como rodar localmente

Como o projeto usa módulos JavaScript, a forma mais segura de rodar é abrir a aplicação por meio de um pequeno servidor local, em vez de abrir o arquivo `index.html` diretamente pelo navegador.

### Opção 1: usando Python

```bash
python -m http.server 5500
```

Depois, acesse:

```txt
http://localhost:5500
```

### Opção 2: usando a extensão Live Server

Se você usa Visual Studio Code, instale a extensão **Live Server**, clique com o botão direito no arquivo `index.html` e escolha **Open with Live Server**.

## Como publicar no GitHub Pages

Depois de subir o projeto para um repositório no GitHub, você pode publicá-lo pelo GitHub Pages seguindo estes passos:

| Passo | Ação |
|---|---|
| 1 | Acesse as configurações do repositório. |
| 2 | Entre em **Pages**. |
| 3 | Em **Source**, selecione a branch principal. |
| 4 | Escolha a pasta raiz do projeto. |
| 5 | Salve e aguarde o GitHub gerar o link público. |

## Melhorias futuras

Algumas ideias para evoluir o projeto são adicionar histórico local de senhas geradas, modo escuro, presets de segurança, exportação de senha como texto e testes automatizados para os módulos JavaScript.

## Licença

Este projeto pode ser usado livremente para estudo, portfólio e publicação no GitHub.
