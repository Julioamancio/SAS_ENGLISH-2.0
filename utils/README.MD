# SAS English Teacher - Sistema de Gestão Escolar e IA

Um sistema completo para professores de inglês gerenciarem turmas, notas, alunos e utilizarem Inteligência Artificial (Google Gemini) para criar aulas, quizzes e corrigir gramática.

---

## 🔐 Credenciais de Acesso Padrão

O sistema vem com um usuário Administrador pré-configurado. Use estas credenciais para o primeiro acesso:

### 👑 Administrador (Acesso Total)
- **Email:** `admin@sas.com`
- **Senha:** `admin123`

### 👨‍🏫 Professores
- Os professores são cadastrados pelo Administrador na aba "Configurações".
- Eles têm acesso a Turmas, Notas, IA e Grammar Book.

### 🎓 Alunos
- Os alunos são cadastrados automaticamente ao serem importados via Excel ou manualmente.
- **Login:** Email do aluno (gerado automaticamente ou importado).
- **Senha Padrão:** `123`
- Eles têm acesso apenas ao **Painel do Aluno** (Notas/Feedback) e ferramentas de estudo (Grammar Book, IA Tutor).

---

## 🚀 Como Colocar Online (Deploy no Render.com)

Siga estes passos exatos para colocar o sistema no ar gratuitamente.

### Passo 1: GitHub
1. Certifique-se de que todos os arquivos deste projeto estão no seu repositório GitHub.

### Passo 2: Render.com
1. Crie uma conta em [render.com](https://render.com).
2. Clique em **"New +"** e selecione **"Static Site"**.
3. Conecte sua conta do GitHub e selecione o repositório `SAS_ENGLISH`.

### Passo 3: Configuração do Build (IMPORTANTE)
Preencha os campos exatamente assim:

- **Name:** `sas-english-teacher` (ou o nome que preferir)
- **Branch:** `main` (ou `master`)
- **Root Directory:** *(Deixe em branco)*
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Passo 4: Configurar a IA (Variáveis de Ambiente)
Para que a Inteligência Artificial (Gemini) funcione, você precisa adicionar a chave da API.

1. Role até a seção **"Environment Variables"** (Advanced).
2. Clique em **"Add Environment Variable"**.
3. Adicione:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** `Sua_Chave_Google_AI_Studio_Aqui`
   *(Você pode gerar uma chave gratuita no [Google AI Studio](https://aistudio.google.com/app/apikey))*

4. Clique em **"Create Static Site"**.

---

## 🛠️ Instalação Local (Para Desenvolvedores)

Se quiser rodar no seu computador:

1. Instale as dependências:
   ```bash
   npm install