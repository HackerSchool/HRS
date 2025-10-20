# 🌐 GitHub Pages Setup - Terminal de Recrutamento

## ✅ Sim, Funciona Perfeitamente!

GitHub Pages é PERFEITO para este projeto porque:
- ✅ HTML/CSS/JavaScript puro (sem build)
- ✅ Grátis e rápido
- ✅ HTTPS automático
- ✅ URL bonito: `username.github.io/repo-name`
- ✅ Suporta subpáginas (congratulations.html)

---

## 🚀 Setup Rápido (5 Minutos)

### Opção 1: Usar Este Repo Atual

```bash
# 1. Adicionar os ficheiros ao git
git add hackerschool.dev/terminal-super-secreto/

# 2. Commit
git commit -m "Add terminal recruitment challenge"

# 3. Push para o GitHub
git push origin main
# (ou a branch que quiseres usar)
```

Depois:
1. Vai ao GitHub → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` (ou a que fizeste push)
4. Folder: `/ (root)` ou seleciona pasta específica
5. Save

**URL final:**
```
https://your-username.github.io/terminal_recrutamento/hackerschool.dev/terminal-super-secreto/
```

---

### Opção 2: Repo Dedicado (Recomendado! ⭐)

Criar um repo só para o terminal:

```bash
# 1. Criar novo repo no GitHub
# Nome: hackerschool-recruitment (ou outro)

# 2. Copiar apenas a pasta terminal-super-secreto
cd ..
git clone https://github.com/your-username/hackerschool-recruitment.git
cd hackerschool-recruitment

# 3. Copiar os ficheiros
cp -r ../terminal_recrutamento/hackerschool.dev/terminal-super-secreto/* .

# 4. Commit e push
git add .
git commit -m "Initial commit - HackerSchool recruitment terminal"
git push origin main

# 5. Ativar GitHub Pages (no site do GitHub)
# Settings → Pages → Source: main → Folder: / (root)
```

**URL final:**
```
https://your-username.github.io/hackerschool-recruitment/
```

**Congratulations:**
```
https://your-username.github.io/hackerschool-recruitment/congratulations.html
```

---

## 📁 Estrutura Para GitHub Pages

```
hackerschool-recruitment/  (repo root)
├── index.html                    # Terminal principal
├── scriptRecrutamento.js
├── fileDefinitions.js
├── styles.css
├── congratulations.html          # Página de parabéns
├── README.md
└── .gitignore
```

**IMPORTANTE:** Os ficheiros auxiliares devem estar no path correto!

---

## 🔧 Ajustes Necessários no index.html

Verifica se os paths dos scripts estão corretos:

```html
<!-- Deve ser: -->
<script src="./../FileTypes/CustomFile.js"></script>
<script src="./../FileSystem.js"></script>

<!-- SE estiveres num repo dedicado, muda para: -->
<script src="./CustomFile.js"></script>  <!-- Se copiares os ficheiros -->
<!-- OU -->
<!-- Remove estas linhas e inclui tudo num ficheiro só -->
```

### Solução: Copiar Ficheiros Auxiliares

Copia estes ficheiros da pasta pai para `terminal-super-secreto/`:
```
CommonFunctions.js
FileSystem.js
ParseInput.js
FileTypes/CustomFile.js
FileTypes/TxtFile.js
FileTypes/HsFile.js
FileTypes/PrjFile.js
FileTypes/EvntFile.js
```

Ou cria uma estrutura assim:
```
repo/
├── index.html
├── scriptRecrutamento.js
├── fileDefinitions.js
├── styles.css
├── congratulations.html
├── CommonFunctions.js
├── FileSystem.js
├── ParseInput.js
└── FileTypes/
    ├── CustomFile.js
    ├── TxtFile.js
    ├── HsFile.js
    ├── PrjFile.js
    └── EvntFile.js
```

---

## 📝 index.html Atualizado

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.19.0/css/jquery.terminal.min.css"/>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.19.0/js/jquery.terminal.min.js"></script>
    <title>HackerSchool - Recruitment Phase 2</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>

<div id="terminal"></div>
<canvas id="chatCanvas"></canvas>

<!-- Ajusta os paths se necessário -->
<script src="./FileTypes/CustomFile.js"></script>
<script src="./FileTypes/TxtFile.js"></script>
<script src="./FileTypes/HsFile.js"></script>
<script src="./FileTypes/PrjFile.js"></script>
<script src="./FileTypes/EvntFile.js"></script>
<script src="fileDefinitions.js"></script>
<script src="./FileSystem.js"></script>
<script src="./ParseInput.js"></script>
<script src="./CommonFunctions.js"></script>
<script src="scriptRecrutamento.js"></script>

</body>
</html>
```

---

## 🎯 QR Code Setup

Quando gerar o QR code, usa o URL final:

```
https://your-username.github.io/hackerschool-recruitment/congratulations.html
```

---

## ⚙️ GitHub Pages Settings

1. **Ir ao repo no GitHub**
2. **Settings** (tab)
3. **Pages** (sidebar esquerdo)
4. **Source:**
   - Deploy from a branch
   - Branch: `main` (ou `gh-pages`)
   - Folder: `/ (root)`
5. **Save**

**Espera 1-2 minutos** e a página estará live! 🎉

---

## 🔐 Configurações Opcionais

### Custom Domain (Opcional)
Se tiveres domínio próprio:
```
Settings → Pages → Custom domain
Exemplo: recruit.hackerschool.dev
```

### HTTPS
✅ Automático no GitHub Pages!

### Analytics (Opcional)
Adiciona Google Analytics ao `index.html` e `congratulations.html`

---

## 🧪 Teste Local Antes de Push

```bash
cd hackerschool.dev/terminal-super-secreto
python -m http.server 8000
```

Abre: `http://localhost:8000`

**Testa TUDO:**
- ✅ Terminal carrega
- ✅ Comandos funcionam
- ✅ Animações funcionam
- ✅ unlock funciona
- ✅ hs-connect funciona
- ✅ hs-login funciona
- ✅ Ficheiros aparecem
- ✅ congratulations.html abre

---

## 📋 Checklist de Deploy

### Antes do Push:
- [ ] Testa tudo localmente
- [ ] Verifica paths dos scripts
- [ ] Confirma que congratulations.html funciona
- [ ] Remove ficheiros desnecessários (.md se não quiseres públicos)
- [ ] Atualiza data do encontro em congratulations.html

### Deploy:
- [ ] Cria repo ou usa existente
- [ ] Copia ficheiros necessários
- [ ] git add + commit + push
- [ ] Ativa GitHub Pages nas settings
- [ ] Espera build (1-2 min)
- [ ] Testa URL final

### Após Deploy:
- [ ] Testa terminal online
- [ ] Testa congratulations.html online
- [ ] Gera QR code com URL online
- [ ] Imprime e esconde QR code
- [ ] Partilha URL do terminal com recrutas

---

## 🎯 URLs Finais

### Se usar repo atual:
```
Terminal: https://YOUR-USERNAME.github.io/terminal_recrutamento/hackerschool.dev/terminal-super-secreto/
Parabéns: https://YOUR-USERNAME.github.io/terminal_recrutamento/hackerschool.dev/terminal-super-secreto/congratulations.html
```

### Se criar repo dedicado (MELHOR):
```
Terminal: https://YOUR-USERNAME.github.io/hackerschool-recruitment/
Parabéns: https://YOUR-USERNAME.github.io/hackerschool-recruitment/congratulations.html
```

---

## 🐛 Troubleshooting

### Página não carrega
- Verifica se GitHub Pages está ativado
- Espera 2-3 minutos após push
- Verifica se o branch está correto
- Vai a: `https://github.com/username/repo/deployments`

### Scripts não carregam
- Verifica paths no index.html
- Abre DevTools (F12) → Console
- Verifica erros 404
- Ajusta paths relativos

### 404 Not Found
- Verifica nome dos ficheiros (case-sensitive!)
- Verifica estrutura de pastas
- GitHub Pages usa Linux (case matters!)

---

## 💡 Dicas

### .gitignore
Cria um `.gitignore` para não fazer push de ficheiros desnecessários:

```
# Documentation (se não quiseres público)
*_GUIDE.md
*_WALKTHROUGH.md
SOLUTION_GUIDE.md

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### README.md Público
Cria um README.md bonito para o repo público (sem spoilers!):

```markdown
# 🎯 HackerSchool - Recruitment Challenge

Terminal-based recruitment challenge para a HackerSchool IST.

🚀 [Inicia o Desafio](https://your-username.github.io/hackerschool-recruitment/)

## 🎮 Como Jogar
1. Abre o terminal
2. Usa comandos Unix
3. Resolve os puzzles
4. Encontra o artefacto
5. Junta-te à equipa!

Boa sorte! 🔥
```

---

## 🎉 Exemplo de Repo Bem Feito

Olha este exemplo de estrutura:

```
hackerschool-recruitment/
├── index.html
├── scriptRecrutamento.js
├── fileDefinitions.js
├── styles.css
├── congratulations.html
├── CommonFunctions.js
├── FileSystem.js
├── ParseInput.js
├── FileTypes/
│   ├── CustomFile.js
│   ├── TxtFile.js
│   └── (outros...)
├── README.md (público - sem spoilers)
├── .gitignore
└── docs/  (opcional)
    ├── SETUP_GUIDE.md
    └── SOLUTION_GUIDE.md (privado!)
```

---

## 🔒 Segurança

### Ficheiros PRIVADOS (NÃO fazer push):
- `SOLUTION_GUIDE.md` - Tem todas as respostas!
- `TEST_WALKTHROUGH.md` - Tem soluções
- Qualquer coisa com credenciais hardcoded

### Como Esconder:
1. Adiciona ao `.gitignore`
2. Ou guarda localmente fora do repo
3. Ou cria repo PRIVADO separado para docs internos

---

## 📞 Precisas de Ajuda?

Posso ajudar-te a:
1. ✅ Criar estrutura de ficheiros otimizada
2. ✅ Ajustar paths no index.html
3. ✅ Criar .gitignore apropriado
4. ✅ Criar README.md público
5. ✅ Copiar ficheiros necessários

**Queres que prepare tudo para ti fazer push?** 🚀

Ou preferes fazer manualmente seguindo este guia? [[memory:7617730]]

