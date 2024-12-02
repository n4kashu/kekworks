'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ThisTerminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'kek.works research terminal',
    'type "help" for available commands'
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Initial welcome message
    setOutput([
      'Available commands:',
      '- help: Show this help menu',
      '- clear: Clear the terminal',
      '- info: Show information about The Brick',
      '- reports: Open research reports window',
      '- ankh: Open ANKH Analytical Nexus window',
      '- fuck the cli: Close all windows and watch the Brick'
    ]);
  }, []);

  const executeCommand = async (cmd: string) => {
    setInput(cmd);
    const commandResponse = await handleCommand(cmd);
    const newOutput = [
      ...output, 
      `anon@this:~$ ${cmd}`,
      ...commandResponse
    ];
    setOutput(newOutput);
    setInput('');
    inputRef.current?.focus();
  };

  const renderLine = (line: string, index: number) => {
    if (line.includes('type &quot;help&quot;')) {
      const parts = line.split('&quot;help&quot;');
      return (
        <div key={index} className="mb-1">
          {parts[0]}
          <span 
            className="text-[#39ff14] hover:text-[#50ff20] hover:underline cursor-pointer transition-colors duration-150"
            onClick={() => {
              setInput('help');
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            &quot;help&quot;
          </span>
          {parts[1]}
        </div>
      );
    }
    // For help menu items
    if (line.startsWith('- ') && line.includes(':')) {
      const [command] = line.split(':');
      const cleanCommand = command.replace('- ', '');
      return (
        <div key={index} className="whitespace-pre-wrap break-words">
          <span 
            className="cursor-pointer hover:text-[#50ff20] hover:underline"
            onClick={() => executeCommand(cleanCommand)}
          >
            {line}
          </span>
        </div>
      );
    }
    // For report files
    if (line.startsWith('- report_') || line.startsWith('- repot_')) {
      const filename = line.replace('- ', '');
      return (
        <div key={index} className="whitespace-pre-wrap break-words">
          <span 
            className="cursor-pointer hover:text-[#50ff20] hover:underline"
            onClick={() => executeCommand(`read ${filename}`)}
          >
            {line}
          </span>
        </div>
      );
    }
    // Default rendering
    return (
      <div key={index} className="whitespace-pre-wrap break-words">
        {line}
      </div>
    );
  };

  const handleCommand = async (cmd: string): Promise<string[]> => {
    const command = cmd.trim().toLowerCase();

    if (command === 'help') {
      return [
        'Available commands:',
        '- help: Show this help menu',
        '- clear: Clear the terminal',
        '- info: Show information about The Brick',
        '- reports: Open research reports window',
        '- ankh: Open ANKH Analytical Nexus window',
        '- fuck the cli: Close all windows and watch the Brick'
      ];
    }

    switch(command) {
      case 'clear':
        setTimeout(() => {
          setOutput(['kek.works research terminal', 'type "help" for available commands']);
        }, 0);
        return [];
      case 'info':
        return [
          '=================================',
          'KEK.WORKS RESEARCH TERMINAL v1.337',
          '=================================',
          '',
          'Welcome to the Emerald Brick research database. ',
          'Current caffeine levels: CRITICAL',
          '',
          'The Brick: A quantum-computational artifact manifesting as Emerald_Brick.exe after the Ritual of Lulz. Features three primary glyphs depicting a watcher, CRT terminal, and DNA helix. Known to induce enlightenment through weaponized irony.',
          '',
          'WARNING: Extended research may result in:',
          '- Spontaneous enlightenment',
          '- Understanding ancient memes',
          '- Quantum humor syndrome',
          '- Uncontrollable mutation of reality perception',
          '- Severe RedBull dependency'
        ];
      case 'reports':
        // Dispatch an event to open the reports window
        const reportsEvent = new CustomEvent('open-reports-window');
        window.dispatchEvent(reportsEvent);
        return ['Opening research reports window...'];
      case 'ankh':
        // Dispatch an event to open the ANKH window
        const ankhEvent = new CustomEvent('open-ankh-window');
        window.dispatchEvent(ankhEvent);
        return [
          'ANKH v1.337 - Analytical Nexus of Kek Hermeneutics',
          'Glyph Analysis Interface',
          '',
          'Processing glyphs from the Emerald Brick...',
          'Reality stability: [███████░░░] 69%',
          'Meme coherence: [█████░░░░░] 42%',
          'Caffeine required: CRITICAL',
          '',
          'Interface for monitoring, recording and analyzing dynamic glyphs on the Brick.',
          'Pending: Timestamps all glyph manifestations, tracks pattern emergence,',
          'and attempts to predict next symbolic mutations.',
          '',
          'Primary glyphs under observation:',
          '[WATCHER] - Entity in contemplation',
          '[TERMINAL] - Ancient CRT interface',
          '[HELIX] - Digital DNA sequence'
        ];
      case 'fuck the cli':
        // Dispatch an event to close all windows
        const closeEvent = new CustomEvent('close-all-windows');
        window.dispatchEvent(closeEvent);
        return [
          'Closing all windows...',
          'Preparing to commune with the Brick...',
          'Reality recalibration in progress...',
          '...',
          'Enjoy the Emerald Enlightenment.'
        ];
      default:
        return [`Unknown command: ${cmd}`];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === 'clear') {
      setOutput(['kek.works research terminal', 'type "help" for available commands']);
    } else {
      const commandResponse = await handleCommand(input);
      const newOutput = [
        ...output, 
        `anon@this:~$ ${input}`,
        ...commandResponse
      ];
      setOutput(newOutput);
    }
    setInput('');
  };

  return (
    <div 
      className="w-full h-full bg-black/10 backdrop-blur-sm
                 text-[#39ff14] font-['Source Code Pro',ui-monospace,monospace] text-base
                 transition-all duration-300 ease-in-out"
      style={{
        overflow: 'hidden',
        animation: 'flicker 0.5s infinite alternate, breathe 3s infinite alternate'
      }}
    >
      <div 
        ref={outputRef}
        className="h-[calc(100%-40px)] overflow-auto px-[15px] py-[15px]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {output.map((line, index) => renderLine(line, index))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 px-[15px] flex items-center">
        <span className="mr-2">anon@this:~$</span>
        <input 
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="enter command..."
        />
      </form>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap');
        
        @keyframes breathe {
          0% { opacity: 0.7; }
          100% { opacity: 0.9; }
        }
        @keyframes flicker {
          0%, 100% { text-shadow: 0 0 4px #39ff14, 0 0 11px #39ff14, 0 0 19px #39ff14; }
          33% { text-shadow: 0 0 4px #39ff14, 0 0 10px #39ff14, 0 0 18px #39ff14; }
          66% { text-shadow: 0 0 4px #39ff14, 0 0 12px #39ff14, 0 0 20px #39ff14; }
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        input {
          font-size: 1rem;
          font-family: 'Source Code Pro', ui-monospace, monospace;
        }
      `}</style>
    </div>
  );
}
