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
      '- ankh: wtf is the ANKH',
      '- way of kek: Close all windows and watch the Brick'
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
        '- ankh: Open ANKH Analytical Nexus window',
        '- way of kek: Close all windows and watch the Brick'
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
      case 'ankh':
        // Dispatch an event to open the ANKH window
        const ankhEvent = new CustomEvent('open-ankh-window');
        window.dispatchEvent(ankhEvent);
        return [
          'ANKH - Analytical Nexus of Kek Hermeneutics',
          'Attempting to access the quantum-computational artifact...',
          'Initializing glyph interface...',
          'Quantum entanglement: ESTABLISHED',
          'Reality stabilization in progress...'
        ];
      case 'way of kek':
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

  const terminalStyles = {
    container: {
      backgroundColor: 'black',
      color: 'rgba(57, 255, 20, 1)', 
      fontFamily: 'monospace',
      fontSize: '14px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
    },
    output: {
      flexGrow: 1,
      overflowY: 'auto' as const,
      padding: '10px',
      color: 'rgba(57, 255, 20, 1)', 
      backgroundColor: 'rgba(0,0,0,0.9)',
    },
    input: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'rgba(57, 255, 20, 1)', 
    },
    prompt: {
      marginRight: '10px',
      color: 'rgba(57, 255, 20, 1)', 
    },
    inputField: {
      flexGrow: 1,
      backgroundColor: 'transparent',
      border: 'none',
      color: 'rgba(57, 255, 20, 1)', 
      outline: 'none',
      fontFamily: 'monospace',
      fontSize: '14px',
    }
  };

  return (
    <div style={terminalStyles.container}>
      {/* Output area */}
      <div 
        ref={outputRef}
        style={terminalStyles.output}
      >
        {output.map((line, index) => renderLine(line, index))}
      </div>

      {/* Command input area - always visible */}
      <div 
        style={terminalStyles.input}
      >
        <span style={terminalStyles.prompt}>anon@this:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          style={terminalStyles.inputField}
          placeholder="Type your command..."
          autoFocus
        />
      </div>
    </div>
  );
}
