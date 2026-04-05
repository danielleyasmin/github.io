# 🗂️ Portfólio — Analista de Dados

Portfólio profissional com suporte a embed de **Power BI** e **Looker Studio**.

---

## 📁 Estrutura de Arquivos

```
portfolio/
├── index.html     ← Estrutura e conteúdo
├── style.css      ← Design, cores, layout
├── script.js      ← Interatividade (filtros, modal, animações)
├── images/        ← Coloque aqui suas imagens
│   ├── foto.jpg       (sua foto de perfil)
│   ├── proj1.jpg      (thumbnail projeto 1)
│   └── ...
└── README.md
```

---

## ✏️ Como Personalizar

### 1. Informações Pessoais
Procure pelo comentário `🔧 EDITAR` no `index.html`. As marcações indicam:
- Nome, descrição e métricas (Hero)
- Texto de apresentação (Sobre)
- Skills e ferramentas (Habilidades)
- Dados de contato (email, LinkedIn, GitHub)

### 2. Foto de Perfil
Substitua a linha com `SVG placeholder` na seção Hero:
```html
<!-- Antes (placeholder SVG) -->
<svg class="photo-placeholder">...</svg>

<!-- Depois (foto real) -->
<img src="images/foto.jpg" alt="Sua foto" />
```

### 3. Adicionar / Editar Projetos

Cada projeto é um bloco `<article class="project-card">` com estes atributos:

| Atributo          | Valor                                  |
|-------------------|----------------------------------------|
| `data-category`   | `powerbi` / `looker` / `python`        |
| `data-embed`      | `true` (abre modal) / `false` (botão externo) |
| `data-embed-url`  | URL pública do relatório (iframe)      |
| `data-project-url`| Link para abrir em nova aba            |

#### Como obter a URL de embed:

**Power BI:**
1. Abra o relatório no Power BI Service
2. Clique em "Arquivo" → "Inserir relatório" → "Site ou portal"
3. Copie a URL do `src` do iframe gerado

**Looker Studio:**
1. Abra o relatório
2. Clique no ícone de compartilhamento → "Incorporar relatório"
3. Copie a URL do `src` do iframe

### 4. Thumbnails dos Projetos
Para substituir os placeholders coloridos por imagens reais:
```html
<!-- Substitua o <div class="thumb-placeholder"> por: -->
<img src="images/proj1.jpg" alt="Nome do Projeto" style="width:100%;height:100%;object-fit:cover;" />
```

### 5. Cores e Tema
Edite as variáveis no início do `style.css`:
```css
:root {
  --accent:  #c8a96e;   /* cor dourada — mude para personalizar */
  --bg:      #0e0e0f;   /* fundo escuro */
  --text:    #e8e4dc;   /* cor do texto */
}
```

---

## 🚀 Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `portfolio`)
2. Faça upload dos arquivos (`index.html`, `style.css`, `script.js`, pasta `images/`)
3. Vá em **Settings** → **Pages** → Source: **Deploy from a branch** → branch `main` → pasta `/ (root)`
4. Aguarde ~1 minuto e acesse: `https://SEU_USUARIO.github.io/portfolio`

---

## 🎨 Paleta de Cores

| Variável        | Valor     | Uso                     |
|-----------------|-----------|-------------------------|
| `--accent`      | `#c8a96e` | Dourado — destaque       |
| `--bg`          | `#0e0e0f` | Fundo principal          |
| `--bg-2`        | `#141416` | Fundo alternado          |
| `--bg-card`     | `#1a1a1d` | Fundo dos cards          |
| `--text`        | `#e8e4dc` | Texto principal          |
| `--text-muted`  | `#8a8680` | Texto secundário         |

---

## 📱 Responsividade

O layout se adapta automaticamente:
- **Desktop** (> 900px): Grid de 3 colunas, hero com foto ao lado
- **Tablet** (640–900px): Grid de 2 colunas
- **Mobile** (< 640px): 1 coluna, menu hambúrguer

---

## ⚙️ Funcionalidades

- ✅ Navbar fixa com blur ao rolar
- ✅ Animações de scroll reveal
- ✅ Filtro por categoria (Power BI / Looker / Python)
- ✅ Modal com embed responsivo (16:9)
- ✅ Botão "Abrir em nova aba" no modal
- ✅ Menu hambúrguer no mobile
- ✅ Tecla ESC fecha o modal
- ✅ Smooth scroll
