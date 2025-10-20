var c = document.getElementById('chatCanvas');
var ctx = c.getContext('2d');
var cw = c.width = 400;
var ch = c.height = 58;

ctx.font = 'normal 32px monospace';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.fillStyle = '#fff';
ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
ctx.shadowColor = '#3f3';


let currentDir = fileSystem['~']; // Diretoria atual
let currentPath = '~'; // Caminho atual (só se usa no cd)
let parsedPath = '~'; // É o caminho que uso nas outras funções

// HackerSchool Secure Network state
let networkState = {
    installedPackages: [],
    requiredPackages: ['hs-secure-browser', 'network-access-key'],
    fakePackages: [
        'hs-secure-browser-lts', 'hs-secure-browser-v2', 'hs-browser-secure',
        'network-access-key-pro', 'network-access-token', 'network-key-access',
        'secure-network-access', 'hs-network-connector'
    ],
    isConnected: false,
    isLoggedIn: false,
    correctUsername: 'hackerschool',
    correctPassword: 'tooeaz4me',
    hintsUnlocked: []
};

// Generate fake random IP
function generateFakeIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Animate text line by line
async function animateLines(terminal, lines, delay = 50) {
    for (const line of lines) {
        terminal.echo(line);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Animate progress bar
async function animateProgressBar(terminal, text, duration = 1000) {
    const steps = 8;
    const chars = '█';
    for (let i = 0; i <= steps; i++) {
        const bar = chars.repeat(i) + '░'.repeat(steps - i);
        const percent = Math.floor((i / steps) * 100);
        terminal.update(-1, `[[;#888;]${text} ${bar} ${percent}%]`);
        await new Promise(resolve => setTimeout(resolve, duration / steps));
    }
}


// Initialize the terminal
$('#terminal').terminal(async function (command) {
    
    let p_input = readArgs(command);
    let comando = p_input.cmd;
    let argumentos = p_input.argumentos;
    paths.parsedPath = getDirectory(argumentos.path);
    
    switch(comando) {
        case 'ls':
            this.echo(ls(argumentos));
            break;
        case 'cd':
            output = cd(argumentos)
            if(output)
                this.echo(output);
            break;
        case 'cat':
            this.echo(cat(argumentos));
            break;
        case 'grep':
            this.echo(grep(argumentos));
            break;
        case 'show':
            this.echo(show(argumentos).replace(/\s+$/, ''));
            break;
        case 'pwd':
            this.echo(pwd());
            break;
        case 'install':
            await installPackage(command, this);
            break;
        case 'hs-connect':
            await connectNetwork(this);
            break;
        case 'hs-login':
            await loginNetwork(command, this);
            break;
        case 'help':
            this.echo(showHelp());
            break;
        case 'unlock':
            await unlockFile(command, this);
            break;
        case 'empty':
            break;
        default:
            this.echo('Comando não reconhecido. Digite "help" para ver comandos disponíveis.');
    }
}, {
    greetings: 'Muito bem, recruta! Conseguiste desbloquear a fase 1. Assim damos-te as boas vindas ao início da jornada.\n\n\
Para passares à próxima fase, tudo que precisas está nesta página, que é um emulador de terminal UNIX (um pouco limitado!). \n\
Lembra-te que a internet e agora o chatgpt estão sempre prontos para te ajudar. \n\n\
O ls é um comando que serve para mostrar que ficheiros e pastas estão num certo local do computador. \n\
Assim, a primeira pista é de borla: experimenta escrever ls e apertar enter a ver o que acontece!\n\n\
[[;#FCE94F;]⚠️  AVISO DE SEGURANÇA: Detectámos actividade suspeita do grupo xad0w.b1ts no sistema.]\n\
[[;#888888;]   Alguns ficheiros podem ter sido comprometidos. Procede com cautela...]\n',
    prompt: getPrompt,   
    name: 'HackerSchool',
    promptExit: false
});

// Help function
function showHelp() {
    return `[[;#0ff;]
╔══════════════════════════════════════════════════╗
║              COMANDOS DISPONÍVEIS                ║
╚══════════════════════════════════════════════════╝
]

[[;#8AE234;]COMANDOS BÁSICOS:]
  [[;#3465A4;]ls [path]]              Lista ficheiros e pastas
  [[;#3465A4;]ls -a [path]]           Lista ficheiros incluindo escondidos (.)
  [[;#3465A4;]cd [path]]              Muda de diretório
  [[;#3465A4;]pwd]                    Mostra diretório atual
  [[;#3465A4;]cat <file>]             Mostra conteúdo de um ficheiro
  [[;#3465A4;]grep <text> <file>]     Procura texto num ficheiro
  [[;#3465A4;]grep -r <text> [path]]  Procura recursivamente

[[;#FCE94F;]COMANDOS ESPECIAIS:]
  [[;#3465A4;]install <package>]         Instala um pacote de segurança
  [[;#3465A4;]unlock <file> <password>]  Desencripta ficheiros protegidos
  [[;#3465A4;]hs-connect]                Conecta à rede HackerSchool
  [[;#3465A4;]hs-login <user> <pass>]    Autentica na rede segura
  [[;#3465A4;]help]                      Mostra esta mensagem

[[;#888;]EXEMPLOS:]
  $ ls
  $ cd xad0w.b1ts
  $ cat hackerschool.txt
  $ ls -a
  $ grep "password" hackerschool.txt
  $ cat cegueira.txt
  $ unlock .access_instructions.txt st@llm4n
  $ install hs-secure-browser

[[;#0ff;]DICA:] Ficheiros que começam com '.' estão escondidos!
[[;#0ff;]      Use 'ls -a' para vê-los.
[[;#0ff;]DICA 2:] Alguns ficheiros podem conter informação escondida!
]`;
}

// HackerSchool Network functions
async function installPackage(command, terminal) {
    const parts = command.trim().split(/\s+/);
    if (parts.length < 2) {
        terminal.echo('Uso: install <package-name>\n\n[[;#888;]Pacotes disponíveis: hs-secure-browser, hs-secure-browser-lts, hs-secure-browser-v2,\nhs-browser-secure, network-access-key, network-access-key-pro, network-access-token,\nnetwork-key-access, secure-network-access, hs-network-connector]\n\n[[;#FCE94F;]💡 ATENÇÃO: Alguns destes pacotes foram comprometidos pelos xad0w.b1ts!]');
        return;
    }
    
    const packageName = parts[1];
    const allPackages = [...networkState.requiredPackages, ...networkState.fakePackages];
    
    if (!allPackages.includes(packageName)) {
        terminal.echo(`[[;#EF2929;]Erro: Pacote '${packageName}' não encontrado nos repositórios.]`);
        return;
    }
    
    if (networkState.installedPackages.includes(packageName)) {
        // Se é pacote falso, bloquear
        if (networkState.fakePackages.includes(packageName)) {
            terminal.echo(`[[;#EF2929;]✗ ACESSO NEGADO]`);
            terminal.echo(`[[;#FCE94F;]⚠️  O pacote '${packageName}' foi BLOQUEADO pelo sistema de segurança!]`);
            terminal.echo(`[[;#888888;]   Este pacote comprometido já tentou infectar o sistema.]`);
            terminal.echo(`[[;#888888;]   Nova tentativa de instalação foi impedida por precaução.]`);
            terminal.echo(`\n[[;#3465A4;]💡 Usa pacotes LEGÍTIMOS da HackerSchool.]`);
        } else {
            terminal.echo(`[[;#FCE94F;]Aviso: Pacote '${packageName}' já está instalado.]`);
        }
        return;
    }
    
    networkState.installedPackages.push(packageName);
    
    if (networkState.fakePackages.includes(packageName)) {
        // ANIMAÇÃO ÉPICA DE HACK
        terminal.echo(`[[;#888;]A instalar '${packageName}'...]`);
        await new Promise(r => setTimeout(r, 800));
        terminal.echo(`[[;#888;]A verificar integridade do pacote...]`);
        await new Promise(r => setTimeout(r, 800));
        terminal.echo(`[[;#888;]A analisar assinatura digital...]`);
        await new Promise(r => setTimeout(r, 1000));
        
        terminal.echo(`[[;#EF2929;]
╔══════════════════════════════════════════╗
║       ⚠️  ALERTA DE SEGURANÇA ⚠️        ║
╚══════════════════════════════════════════╝
]`);
        await new Promise(r => setTimeout(r, 500));
        terminal.echo(`[[;#EF2929;]✗ ERRO: Assinatura digital INVÁLIDA!]`);
        await new Promise(r => setTimeout(r, 600));
        terminal.echo(`[[;#888;]A abortar instalação...]`);
        await new Promise(r => setTimeout(r, 500));
        terminal.echo(`[[;#888;]A limpar ficheiros temporários...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#EF2929;]
ERRO CRÍTICO: Código malicioso detectado!
]`);
        await new Promise(r => setTimeout(r, 500));
        
        // GLITCH EFFECT - SMOOTH STREAM
        const glitchChars = '█▓▒░!@#$%^&*()_+-={}[]|\\:";\'<>?,./§±×÷';
        const evilMessages = [
            'AHAHAHAHA não tens escapatória AHAHAHAHA',
            'xbxbxbxb diz adeus ao teu terminal xbxbxbxb'
        ];
        
        // Stream de glitch com mensagens intercaladas
        for(let wave = 0; wave < 8; wave++) {
            let glitch = '';
            for(let j = 0; j < 150; j++) {  // ← Reduzido de 60000 para 150!
                glitch += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            terminal.echo(`[[;#EF2929;]${glitch}]`);
            await new Promise(r => setTimeout(r, 80));
            
            // Intercalar mensagens evil
            if (wave === 1) {
                terminal.echo(`[[;#EF2929;]ihihihahahah os xb estão a ver-te ihihihahahah]`);
                await new Promise(r => setTimeout(r, 600));
            }
            if (wave === 4) {
                terminal.echo(`[[;#EF2929;]${evilMessages[Math.floor(Math.random() * evilMessages.length)]}]`);
                await new Promise(r => setTimeout(r, 600));
            }
            
        }
        
        await new Promise(r => setTimeout(r, 500));
        terminal.echo(`[[;#FF0000;]
╔═════════════════════════════════╗
║   💀 SISTEMA COMPROMETIDO 💀   ║
╚═════════════════════════════════╝
]`);
        await new Promise(r => setTimeout(r, 800));
        
        const fakeIP = generateFakeIP();
        terminal.echo(`[[;#FF0000;]xad0w.b1ts: Estás a divertir-te? 😂]`);
        await new Promise(r => setTimeout(r, 1200));
        terminal.echo(`[[;#FF0000;]xad0w.b1ts: Não vais ir longe, estamos a observar-te.]`);
        await new Promise(r => setTimeout(r, 1200));
        terminal.echo(`[[;#FF0000;]xad0w.b1ts: O teu IP é ${fakeIP}, Lisboa, Portugal]`);
        await new Promise(r => setTimeout(r, 1200));
        terminal.echo(`[[;#FF0000;]xad0w.b1ts: Ainda vais a tempo de te salvar. Desiste enquanto podes.]`);
        await new Promise(r => setTimeout(r, 1500));
        
        // MORE GLITCH WAVES
        for(let wave = 0; wave < 5; wave++) {
            let glitch = '';
            for(let j = 0; j < 180; j++) {  // ← Reduzido para 180
                glitch += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            terminal.echo(`[[;#EF2929;]${glitch}]`);
            await new Promise(r => setTimeout(r, 90));
            
            if (wave === 1) {
                terminal.echo(`[[;#EF2929;]ihihihahahah consegues sentir o sistema a falhar? ihihihahahah]`);
                await new Promise(r => setTimeout(r, 600));
            }
            if (wave === 3) {
                terminal.echo(`[[;#EF2929;]xb xb xb xb estamos em todo o lado xb xb xb xb]`);
                await new Promise(r => setTimeout(r, 600));
            }
        }
        
        terminal.echo(`[[;#EF2929;]SISTEMA FALHANDO... ]`);
        await new Promise(r => setTimeout(r, 600));
        terminal.echo(`[[;#EF2929;]PERDA DE DADOS IMINENTE...]`);
        await new Promise(r => setTimeout(r, 1000));
        
        // RECOVERY
        terminal.echo(`\n[[;#888;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
        await new Promise(r => setTimeout(r, 500));
        terminal.echo(`[[;#FCE94F;][SISTEMA] A tentar recuperar...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#FCE94F;][SISTEMA] A isolar ameaça...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;][FIREWALL] A ativar proteção de emergência...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;][FIREWALL] A bloquear tráfego suspeito...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;][ANTIVIRUS] A escanear ficheiros...]`);
        await new Promise(r => setTimeout(r, 800));
        
        // Progress bar animation
        terminal.echo(`[[;#888;][ANTIVIRUS] A remover malware... ]`);
        for(let i = 0; i <= 8; i++) {
            const bar = '█'.repeat(i) + '░'.repeat(8 - i);
            terminal.update(-1, `[[;#888;][ANTIVIRUS] A remover malware... ${bar} ${Math.floor((i/8)*100)}%]`);
            await new Promise(r => setTimeout(r, 200));
        }
        await new Promise(r => setTimeout(r, 800));
        
        terminal.echo(`[[;#8AE234;][SISTEMA] Ameaça neutralizada!]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#8AE234;][SISTEMA] Sistema restaurado com sucesso!]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
        await new Promise(r => setTimeout(r, 800));
        
        terminal.echo(`[[;#0ff;]
╔══════════════════════════════════════════╗
║    ✓ SISTEMA SEGURO NOVAMENTE ✓         ║
╚══════════════════════════════════════════╝
]`);
        await new Promise(r => setTimeout(r, 1000));
        
        // REBOOT DO SISTEMA
        terminal.echo('');
        terminal.echo('[[;#FCE94F;][SISTEMA] A reiniciar terminal...]');
        await new Promise(r => setTimeout(r, 1200));
        terminal.echo('[[;#888;][SISTEMA] A limpar buffer de memória...]');
        await new Promise(r => setTimeout(r, 1000));
        terminal.echo('[[;#888;][SISTEMA] A recarregar shell...]');
        await new Promise(r => setTimeout(r, 800));
        
        // RESET do path para HOME antes do reboot
        paths.currentPath = '~';
        paths.currentDir = fileSystem['~'];
        paths.parsedPath = fileSystem['~'];
        
        // CRUCIAL: Pausar terminal ANTES do clear para bloquear comandos fantasma
        terminal.pause();
        
        // Espera para garantir que tudo foi processado
        await new Promise(r => setTimeout(r, 500));
        
        // Clear e PURGE para limpar buffer de comandos
        terminal.clear();
        if (terminal.purge) {
            terminal.purge();  // Remove comandos pendentes do buffer
        }
        
        await new Promise(r => setTimeout(r, 800));
        
        // Agora faz os echos com segurança
        terminal.echo('[[;#8AE234;]╔══════════════════════════════════════════╗]');
        terminal.echo('[[;#8AE234;]║       ✓ SISTEMA REINICIADO ✓            ║]');
        terminal.echo('[[;#8AE234;]╚══════════════════════════════════════════╝]');
        await new Promise(r => setTimeout(r, 800));
        terminal.echo('');
        terminal.echo('[[;#FCE94F;]⚠️  ISSO FOI PERTO! O pacote \''+packageName+'\' era uma ARMADILHA!]');
        terminal.echo('[[;#888888;]   Os xad0w.b1ts tentaram hackear o teu terminal!]');
        terminal.echo('[[;#8AE234;]   Felizmente, a proteção neutralizou a ameaça.]');
        terminal.echo('');
        terminal.echo('[[;#3465A4;]💡 LIÇÃO APRENDIDA:]');
        terminal.echo('[[;#888888;]   Nem todos os pacotes são legítimos!]');
        terminal.echo('[[;#888888;]   Procura os pacotes OFICIAIS da HackerSchool.]');
        terminal.echo('');
        terminal.echo('[[;#888;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]');
        await new Promise(r => setTimeout(r, 500));
        terminal.echo('');
        terminal.echo('Muito bem, recruta! Conseguiste desbloquear a fase 1. Assim damos-te as boas vindas ao início da jornada.');
        terminal.echo('');
        terminal.echo('Para passares à próxima fase, tudo que precisas está nesta página, que é um emulador de terminal UNIX (um pouco limitado!).');
        terminal.echo('Lembra-te que a internet e agora o chatgpt estão sempre prontos para te ajudar.');
        terminal.echo('');
        terminal.echo('O ls é um comando que serve para mostrar que ficheiros e pastas estão num certo local do computador.');
        terminal.echo('Assim, a primeira pista é de borla: experimenta escrever ls e apertar enter a ver o que acontece!');
        terminal.echo('');
        terminal.echo('[[;#FCE94F;]⚠️  AVISO DE SEGURANÇA: Detectámos actividade suspeita do grupo xad0w.b1ts no sistema.]');
        terminal.echo('[[;#888888;]   Alguns ficheiros podem ter sido comprometidos. Procede com cautela...]');
        
        // CRUCIAL: Forçar update do prompt ANTES de reativar
        terminal.set_prompt(getPrompt());  // ← Força mostrar guest@hackerschool:~$
        
        // CRUCIAL: Reativar o terminal no final
        terminal.resume();
        
        return;
    }
    
    // Pacote CORRETO - animação positiva
    terminal.echo(`[[;#888;]A instalar '${packageName}'...]`);
    await new Promise(r => setTimeout(r, 700));
    
    // Download progress bar
    terminal.echo(`[[;#888;]A descarregar pacote... ]`);
    for(let i = 0; i <= 16; i++) {
        const bar = '█'.repeat(i) + '░'.repeat(16 - i);
        terminal.update(-1, `[[;#888;]A descarregar pacote... ${bar} ${Math.floor((i/16)*100)}%]`);
        await new Promise(r => setTimeout(r, 80));
    }
    await new Promise(r => setTimeout(r, 400));
    
    terminal.echo(`[[;#888;]A verificar assinatura digital... ✓]`);
    await new Promise(r => setTimeout(r, 600));
    terminal.echo(`[[;#888;]A validar integridade... ✓]`);
    await new Promise(r => setTimeout(r, 500));
    
    terminal.echo(`[[;#8AE234;]
╔══════════════════════════════════════════╗
║        ✓ INSTALAÇÃO COMPLETA ✓          ║
╚══════════════════════════════════════════╝
]`);
    await new Promise(r => setTimeout(r, 600));
    terminal.echo(`[[;#8AE234;]✓ Pacote '${packageName}' instalado com sucesso!]`);
    
    // Check if all required packages are installed
    const hasAll = networkState.requiredPackages.every(pkg => 
        networkState.installedPackages.includes(pkg)
    );
    
    if (hasAll) {
        await new Promise(r => setTimeout(r, 500));
        terminal.echo('\n[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]');
        terminal.echo('[[;#0ff;]💡 SISTEMA PRONTO PARA CONEXÃO]');
        terminal.echo('[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]');
        terminal.echo('[[;#8AE234;]Todos os pacotes necessários foram instalados!]');
        terminal.echo('[[;#3465A4;]Podes agora conectar à rede segura: hs-connect]');
    }
}

async function connectNetwork(terminal) {
    const hasRequired = networkState.requiredPackages.every(pkg => 
        networkState.installedPackages.includes(pkg)
    );
    
    const hasOnlyFake = networkState.installedPackages.length > 0 && 
        networkState.installedPackages.every(pkg => networkState.fakePackages.includes(pkg));
    
    if (!networkState.installedPackages.length) {
        terminal.echo(`[[;#EF2929;]Erro: Nenhum pacote de segurança instalado.]
[[;#FCE94F;]Precisas de instalar os pacotes necessários primeiro.]
[[;#3465A4;]Dica: Usa 'install <package-name>' para instalar.]`);
        return;
    }
    
    if (hasOnlyFake) {
        terminal.echo(`[[;#888;]A iniciar conexão...]`);
        await new Promise(r => setTimeout(r, 800));
        terminal.echo(`[[;#888;]A verificar pacotes de segurança...]`);
        await new Promise(r => setTimeout(r, 800));
        terminal.echo(`[[;#EF2929;]
╔══════════════════════════════════════════╗
║         ✗ CONEXÃO FALHADA ✗             ║
╚══════════════════════════════════════════╝
]`);
        terminal.echo(`[[;#EF2929;]✗ ERRO: Pacotes comprometidos detectados!]`);
        terminal.echo(`[[;#FCE94F;]Os pacotes instalados foram adulterados pelos xad0w.b1ts.]`);
        terminal.echo(`[[;#888888;]   Status: Assinaturas digitais inválidas]`);
        terminal.echo(`[[;#888888;]   Ação: Procura os pacotes OFICIAIS da HackerSchool]`);
        terminal.echo(`[[;#888888;]   Dica: Ficheiros escondidos têm as instruções corretas]`);
        return;
    }
    
    if (!hasRequired) {
        const missing = networkState.requiredPackages.filter(pkg => 
            !networkState.installedPackages.includes(pkg)
        );
        terminal.echo(`[[;#EF2929;]Erro: Pacotes em falta: ${missing.join(', ')}]`);
        terminal.echo(`[[;#FCE94F;]Instala todos os pacotes necessários antes de conectar.]`);
        return;
    }
    
    networkState.isConnected = true;
    
    terminal.echo(`[[;#888;]A iniciar conexão à rede segura...]`);
    await new Promise(r => setTimeout(r, 700));
    terminal.echo(`[[;#888;]A verificar pacotes de segurança... ✓]`);
    await new Promise(r => setTimeout(r, 600));
    
    // ANIMAÇÃO DE TÚNEL DIGITAL / VÓRTEX
    terminal.echo('[[;#888;]A estabelecer túnel encriptado...]');
    await new Promise(r => setTimeout(r, 400));
    terminal.echo('[[;#0ff;]A abrir portal digital...]');
    await new Promise(r => setTimeout(r, 500));
    
    // Vórtex Matrix animation - frames progressivos
    const vortexFrames = [
        `[[;#0ff;]          . : . : . : .          ]`,
        `[[;#0ff;]       · ∴ ∵ ∴ ∵ ∴ ∵ ∴ ·       ]`,
        `[[;#0ff;]     ∴ ░▒▓ CONECTANDO ▓▒░ ∴     ]`,
        `[[;#0ff;]   · ▒▓█ ◆ ◇ ◆ ◇ ◆ █▓▒ ·   ]`,
        `[[;#0ff;] ∵ ▓██ ≋ ≈ ≋ ≈ ≋ ≈ ██▓ ∵ ]`,
        `[[;#8AE234;]∴ ███ ▓▒░▒▓ TÚNEL ▓▒░▒▓ ███ ∴]`,
        `[[;#8AE234;]███████ ◇◆◇◆◇◆◇◆◇ ███████]`,
        `[[;#0ff;]████████████ ∴∵∴∵∴ ████████████]`,
        `[[;#0ff;]██████████████████████████████]`
    ];
    
    for (let frame of vortexFrames) {
        terminal.update(-1, frame);
        await new Promise(r => setTimeout(r, 200));
    }
    
    await new Promise(r => setTimeout(r, 600));
    
    // Flash de luz
    terminal.echo('[[;#0ff;]⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡]');
    await new Promise(r => setTimeout(r, 150));
    terminal.update(-1, '[[;#fff;]████████████████████████████████████████]');
    await new Promise(r => setTimeout(r, 150));
    terminal.update(-1, '[[;#0ff;]⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡]');
    await new Promise(r => setTimeout(r, 150));
    terminal.clear();
    await new Promise(r => setTimeout(r, 300));
    
    // Box final aparece
    terminal.echo(`[[;#8AE234;]
╔══════════════════════════════════════════╗
║  🔐 HACKERSCHOOL SECURE NETWORK 🔐      ║
║       Conexão Estabelecida ✓             ║ 
╚══════════════════════════════════════════╝
]`);
    await new Promise(r => setTimeout(r, 700));
    terminal.echo(`\n[[;#8AE234;]✓ Conectado com sucesso à rede interna da HackerSchool!]`);
    terminal.echo(`\n[[;#FCE94F;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#FCE94F;]⚠️  ALERTA DE SEGURANÇA - Intrusão Detectada]`);
    terminal.echo(`[[;#FCE94F;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#888888;]O grupo xad0w.b1ts infiltrou-se no sistema.]`);
    terminal.echo(`[[;#888888;]Vários ficheiros foram comprometidos com dados falsos.]`);
    terminal.echo(`[[;#888888;]Procura apenas informação de fontes [SEGURO ✓]]`);
    terminal.echo(`\n[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#0ff;]PRÓXIMO PASSO: Autenticação]`);
    terminal.echo(`[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#3465A4;]Comando: hs-login <username> <password>]`);
    
}

async function loginNetwork(command, terminal) {
    if (!networkState.isConnected) {
        terminal.echo(`[[;#EF2929;]Erro: Não estás conectado à rede segura.]
[[;#3465A4;]Usa 'hs-connect' primeiro.]`);
        return;
    }
    
    const parts = command.trim().split(/\s+/);
    if (parts.length < 3) {
        terminal.echo(`[[;#FCE94F;]Uso: hs-login <username> <password>]`);
        return;
    }
    
    const username = parts[1].toLowerCase();
    const password = parts[2].toLowerCase();
    
    if (username !== networkState.correctUsername || password !== networkState.correctPassword) {
        terminal.echo(`[[;#888;]A validar credenciais...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;]A verificar username...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;]A verificar password...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#EF2929;]
╔══════════════════════════════════════════╗
║      ✗ AUTENTICAÇÃO FALHADA ✗           ║
╚══════════════════════════════════════════╝
]`);
        terminal.echo(`[[;#EF2929;]✗ Credenciais inválidas.]`);
        terminal.echo(`[[;#888888;]   Username: ${username !== networkState.correctUsername ? 'INCORRETO' : 'CORRETO'}]`);
        terminal.echo(`[[;#888888;]   Password: ${password !== networkState.correctPassword ? 'INCORRETO' : 'CORRETO'}]`);
        terminal.echo(`\n[[;#3465A4;]💡 As credenciais estão num ficheiro especial...]`);
        terminal.echo(`[[;#888888;]   Precisas de VER melhor... 👁️]`);
        return;
    }
    
    networkState.isLoggedIn = true;
    
    // Add secure network directory to filesystem
    fileSystem['~']['hackerschool_net'] = hackerschoolSecureNetwork;
    
    terminal.echo(`[[;#888;]A validar credenciais...]`);
    await new Promise(r => setTimeout(r, 700));
    terminal.echo(`[[;#888;]A verificar username... ✓]`);
    await new Promise(r => setTimeout(r, 600));
    terminal.echo(`[[;#888;]A verificar password... ✓]`);
    await new Promise(r => setTimeout(r, 600));
    
    // Auth progress bar
    terminal.echo(`[[;#888;]A autenticar utilizador... ]`);
    for(let i = 0; i <= 12; i++) {
        const bar = '█'.repeat(i) + '░'.repeat(12 - i);
        terminal.update(-1, `[[;#888;]A autenticar utilizador... ${bar} ${Math.floor((i/12)*100)}%]`);
        await new Promise(r => setTimeout(r, 100));
    }
    await new Promise(r => setTimeout(r, 500));
    
    terminal.echo(`[[;#888;]A carregar perfil de recruta...]`);
    await new Promise(r => setTimeout(r, 700));
    terminal.echo(`[[;#888;]A desencriptar ficheiros seguros...]`);
    await new Promise(r => setTimeout(r, 700));
    terminal.echo(`[[;#888;]A montar diretório de rede...]`);
    await new Promise(r => setTimeout(r, 700));
    
    terminal.echo(`[[;#8AE234;]
╔══════════════════════════════════════════╗
║   ✓ AUTENTICAÇÃO BEM-SUCEDIDA! ✓        ║
╚══════════════════════════════════════════╝
]`);
    await new Promise(r => setTimeout(r, 800));

    terminal.echo(`\n[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#0ff;]   BEM-VINDO À REDE INTERNA DA HACKERSCHOOL   ]`);
    terminal.echo(`[[;#0ff;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);

    terminal.echo(`\n[[;#8AE234;]✓ Acesso concedido ao recruta: ${username}]`);
    terminal.echo(`[[;#8AE234;]✓ Nova pasta montada: 'hackerschool_net']`);

    terminal.echo(`\n[[;#FCE94F;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#FCE94F;]⚠️  ALERTA DE SEGURANÇA - IMPORTANTE]`);
    terminal.echo(`[[;#FCE94F;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]`);
    terminal.echo(`[[;#888888;]Os xad0w.b1ts comprometeram vários ficheiros na rede.]`);
    terminal.echo(`[[;#888888;]Eles injetaram dados FALSOS para te confundir!]`);

    terminal.echo(`\n[[;#FCE94F;]Boa sorte, recruta! 🚀]`);
}

// Unlock encrypted files
async function unlockFile(command, terminal) {
    const parts = command.trim().split(/\s+/);
    
    if (parts.length < 3) {
        terminal.echo(`[[;#FCE94F;]Uso: unlock <filename> <password>]
[[;#888;]Exemplo: unlock .access_instructions.txt st@llm4n]`);
        return;
    }
    
    const filename = parts[1];
    const password = parts[2];
    
    // Build the correct path
    let targetPath = filename;
    if (!filename.startsWith('~') && !filename.startsWith('/')) {
        // Relative path - add current path
        if (paths.currentPath === '~') {
            targetPath = '~/' + filename;
        } else {
            targetPath = paths.currentPath + '/' + filename;
        }
    }
    
    // Try to get the file from filesystem directly
    let file = null;
    const pathParts = targetPath.split('/').filter(p => p && p !== '~');
    let current = fileSystem['~'];
    
    for (const part of pathParts) {
        if (current && current[part]) {
            current = current[part];
        } else {
            terminal.echo(`[[;#EF2929;]Erro: Ficheiro '${filename}' não encontrado.]`);
            return;
        }
    }
    
    file = current;
    
    if (!file || typeof file !== 'object' || !file.content) {
        terminal.echo(`[[;#EF2929;]Erro: '${filename}' não é um ficheiro válido.]`);
        return;
    }
    
    if (!file.isLocked) {
        terminal.echo(`[[;#FCE94F;]Aviso: Ficheiro '${filename}' não está encriptado.]`);
        return;
    }
    
    if (password !== 'st@llm4n') {
        terminal.echo(`[[;#888;]A tentar desencriptar...]`);
        await new Promise(r => setTimeout(r, 700));
        terminal.echo(`[[;#888;]A validar password...]`);
        await new Promise(r => setTimeout(r, 800));
        terminal.echo(`[[;#EF2929;]
╔══════════════════════════════════════════╗
║      ✗ PASSWORD INCORRECTA ✗            ║
╚══════════════════════════════════════════╝
]`);
        await new Promise(r => setTimeout(r, 500));
        terminal.echo(`[[;#EF2929;]✗ Falha na desencriptação.]`);
        terminal.echo(`[[;#888888;]   Password fornecida: ${password}]`);
        terminal.echo(`[[;#888888;]   Status: INVÁLIDA]`);
        terminal.echo(`\n[[;#3465A4;]💡 Procura a password nos outros ficheiros...]`);
        terminal.echo(`[[;#888888;]   Algo relacionado com o fundador do Free Software]`);
        return;
    }
    
    // Unlock successful
    file.isLocked = false;
    file.content = `[COMUNICAÇÃO INTERNA - HackerSchool]
[✓ DESENCRIPTADO]
[CONFIDENCIAL]
Data: 2025-10-18

De: Admin HackerSchool
Para: Recrutas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ PASSWORD CORRECTA: st@llm4n
✓ Ficheiro desencriptado com sucesso!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSTRUÇÕES DE ACESSO À REDE SEGURA

Bem-vindo ao processo de recrutamento!
Para acederes à nossa rede interna, segue estes passos:

1️⃣ INSTALAR PACOTES DE SEGURANÇA
   Precisas de 2 pacotes específicos:
   • hs-sxbure-broxber (navegador seguro)
   • nxbwork-accexb-key (chave de acesso)
   
   ⚠️  ATENÇÃO CRÍTICA: Os xad0w.b1ts infiltraram
   VÁRIOS pacotes FALSOS no sistema! 
   
   Alguns têm nomes MUITO parecidos com os oficiais:
   - Versões "LTS", "v2", "PRO"
   - Palavras trocadas: "browser-secure" vs "secure-browser"
   - Palavras similares: "token" vs "key"
   
   💡 DICA: As letras "xb" nestes nomes representam
   caracteres corrompidos. Substitui por letras que
   façam sentido! Só os pacotes OFICIAIS funcionam!

2️⃣ ESTABELECER CONEXÃO
   Comando: hs-connect
   
3️⃣ AUTENTICAÇÃO
   Não consegues VER onde está? 👁️
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANTE:
- Usa 'install <package-name>' para instalar
- Os xad0w.b1ts criaram dezenas de pacotes falsos!
- Testa diferentes combinações de letras
- Pensa: quais as letras mais prováveis para substituir "xb"?
  
Boa sorte, futuro membro!

- HackerSchool Admin Team`;
    
    terminal.echo(`[[;#888;]A tentar desencriptar ficheiro...]`);
    await new Promise(r => setTimeout(r, 700));
    
    // Password validation progress bar
    terminal.echo(`[[;#888;]A validar password... ]`);
    for(let i = 0; i <= 8; i++) {
        const bar = '█'.repeat(i) + '░'.repeat(8 - i);
        terminal.update(-1, `[[;#888;]A validar password... ${bar} ${Math.floor((i/8)*100)}%]`);
        await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 500));
    
    terminal.echo(`[[;#888;]A aplicar chave AES-256...]`);
    await new Promise(r => setTimeout(r, 800));
    terminal.echo(`[[;#888;]A desencriptar blocos... ✓]`);
    await new Promise(r => setTimeout(r, 700));
    
    terminal.echo(`[[;#8AE234;]
╔══════════════════════════════════════════╗
║  ✓ DESENCRIPTAÇÃO BEM-SUCEDIDA! ✓       ║
╚══════════════════════════════════════════╝
]`);
    await new Promise(r => setTimeout(r, 600));
    terminal.echo(`\n[[;#8AE234;]✓ Ficheiro '${filename}' desencriptado!]`);
    terminal.echo(`[[;#3465A4;]Podes agora ler o ficheiro com: cat ${filename}]`);
}










