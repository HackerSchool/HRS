# 🚀 Deploy para GitHub Pages - PRONTO!

## ✅ TUDO PREPARADO!

Todos os ficheiros necessários foram copiados e configurados.
A estrutura está pronta para GitHub Pages!

---

## 📁 Estrutura Atual

```
terminal-super-secreto/
├── index.html                   ✅ Paths corrigidos
├── scriptRecrutamento.js        ✅ Completo
├── fileDefinitions.js           ✅ Completo
├── styles.css                   ✅ OK
├── congratulations.html         ✅ Página de parabéns
│
├── CommonFunctions.js           ✅ COPIADO
├── FileSystem.js                ✅ COPIADO
├── ParseInput.js                ✅ COPIADO
│
├── FileTypes/                   ✅ PASTA CRIADA
│   ├── CustomFile.js            ✅ COPIADO
│   ├── TxtFile.js               ✅ COPIADO
│   ├── HsFile.js                ✅ COPIADO
│   ├── PrjFile.js               ✅ COPIADO
│   └── EvntFile.js              ✅ COPIADO
│
├── .gitignore                   ✅ CRIADO
├── README_GITHUB.md             ✅ README público (sem spoilers)
│
└── docs/ (opcional - privados)
    ├── SETUP_GUIDE.md
    ├── SOLUTION_GUIDE.md        ⚠️  NÃO FAZER PUSH!
    ├── TEST_WALKTHROUGH.md
    └── CHANGELOG.md
```

---

## 🎯 PRÓXIMOS PASSOS

### Opção 1: Repo Dedicado (RECOMENDADO ⭐)

```bash
# 1. Criar novo repo no GitHub
#    Nome sugerido: hackerschool-recruitment
#    Descrição: "HackerSchool IST - Terminal Recruitment Challenge"
#    Público: ✅ (para GitHub Pages grátis)

# 2. No teu terminal local:
cd "C:\Users\Armando RPG\OneDrive - Universidade de Lisboa\Documentos\HackerSchool\WebDev\terminal_recrutamento"

# 3. Criar novo repo local
mkdir hackerschool-recruitment
cd hackerschool-recruitment
git init

# 4. Copiar APENAS os ficheiros necessários
#    (IGNORA SOLUTION_GUIDE.md e TEST_WALKTHROUGH.md!)
cp -r ../hackerschool.dev/terminal-super-secreto/* .

# OU no Windows PowerShell:
Copy-Item -Path "..\hackerschool.dev\terminal-super-secreto\*" -Destination "." -Recurse

# 5. Renomear README
mv README_GITHUB.md README.md

# 6. IMPORTANTE: Apagar ficheiros privados!
rm SOLUTION_GUIDE.md
rm TEST_WALKTHROUGH.md

# 7. Adicionar remote
git remote add origin https://github.com/SEU-USERNAME/hackerschool-recruitment.git

# 8. Commit
git add .
git commit -m "Initial commit - HackerSchool recruitment terminal"

# 9. Push
git branch -M main
git push -u origin main
```

### Opção 2: Usar Este Repo

Se já estiveres num repo git:

```bash
cd "hackerschool.dev/terminal-super-secreto"

# Adicionar apenas ficheiros públicos
git add index.html
git add scriptRecrutamento.js
git add fileDefinitions.js
git add styles.css
git add congratulations.html
git add CommonFunctions.js
git add FileSystem.js
git add ParseInput.js
git add FileTypes/
git add .gitignore
git add README_GITHUB.md

# Commit
git commit -m "Add recruitment terminal - Phase 2"

# Push
git push origin main
```

---

## ⚙️ Ativar GitHub Pages

1. **Vai ao GitHub** → https://github.com/SEU-USERNAME/SEU-REPO

2. **Settings** (tab no topo)

3. **Pages** (menu lateral esquerdo)

4. **Configure:**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```
   
   **OU se usares o repo atual:**
   ```
   Folder: /hackerschool.dev/terminal-super-secreto
   ```

5. **Save**

6. **Espera 1-2 minutos**

7. **Testa o URL:**
   ```
   https://SEU-USERNAME.github.io/hackerschool-recruitment/
   ```

---

## 🔗 URLs Finais

### Se criares repo dedicado:
```
Terminal Principal:
https://SEU-USERNAME.github.io/hackerschool-recruitment/

Página de Parabéns:
https://SEU-USERNAME.github.io/hackerschool-recruitment/congratulations.html
```

### Se usares repo atual:
```
Terminal Principal:
https://SEU-USERNAME.github.io/REPO-NAME/hackerschool.dev/terminal-super-secreto/

Página de Parabéns:
https://SEU-USERNAME.github.io/REPO-NAME/hackerschool.dev/terminal-super-secreto/congratulations.html
```

---

## ✅ Checklist de Deploy

### Antes do Push:
- [x] ✅ Ficheiros auxiliares copiados
- [x] ✅ Paths no index.html corrigidos
- [x] ✅ .gitignore criado
- [x] ✅ README público criado
- [ ] ⚠️  **APAGAR SOLUTION_GUIDE.md antes do push!**
- [ ] ⚠️  **APAGAR TEST_WALKTHROUGH.md antes do push!**
- [ ] 📅 Atualizar data do encontro em congratulations.html

### Após Push:
- [ ] Ativar GitHub Pages
- [ ] Testar URL do terminal
- [ ] Testar congratulations.html
- [ ] Gerar QR code com URL final
- [ ] Atualizar link da imagem em fileDefinitions.js (se necessário)

---

## 🧪 Testar Localmente Primeiro

```bash
cd hackerschool.dev/terminal-super-secreto
python -m http.server 8000
```

Abre: `http://localhost:8000`

**Testa:**
- ✅ Terminal carrega sem erros (F12 → Console)
- ✅ Todos os comandos funcionam
- ✅ `unlock .access_instructions.txt st@llm4n` funciona
- ✅ `install hs-secure-browser` funciona
- ✅ Animação de hack funciona
- ✅ `hs-connect` mostra vórtex
- ✅ `hs-login` funciona
- ✅ congratulations.html abre

---

## 🎯 Gerar QR Code

Quando o site estiver online, usa o URL final:

```
https://SEU-USERNAME.github.io/hackerschool-recruitment/congratulations.html
```

**Sites para gerar:**
- https://www.qr-code-generator.com/
- https://www.qrcode-monkey.com/

Imprime e esconde na página 133 do livro! 📚

---

## 🐛 Troubleshooting

### Site não carrega
- Espera 2-3 minutos após ativar Pages
- Verifica se branch está correto
- Vai a: `github.com/username/repo/deployments`

### Erros no Console
- Abre F12 → Console
- Verifica erros 404 (ficheiros não encontrados)
- Confirma que FileTypes/ foi copiada

### QR code não funciona
- Testa URL diretamente no browser
- Certifica-te que é HTTPS
- Regenera QR code se necessário

---

## 📞 Suporte

- 🌐 [hackerschool.dev](https://hackerschool.dev)
- 💻 [GitHub](https://github.com/HackerSchool)

---

## 🎉 Pronto!

Segue os passos acima e em 5 minutos está online! 🚀

**Boa sorte com o recrutamento!**

*"Sue us, leicers!"* 😎

