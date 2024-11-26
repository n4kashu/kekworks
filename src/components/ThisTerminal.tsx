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
      '- info: Show information about this terminal',
      '- mint: Mint a new NFT',
      '- what_the_brick: Show what the brick is',
      '- reports: List available reports',
      '- read <filename>: Read a report file'
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
    if (line.includes('type "help"')) {
      const parts = line.split('"help"');
      return (
        <div key={index} className="mb-1">
          {parts[0]}
          <span 
            className="text-[#39ff14] hover:text-[#50ff20] hover:underline cursor-pointer transition-colors duration-150"
            onClick={() => {
              setInput('help');
              handleSubmit(new Event('click') as any);
            }}
          >
            "help"
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

  const listReports = async () => {
    return [
      'Available Reports:',
      '- report_001.html',
      '- repot_002.txt',
      '',
      'To read a report, type: read <filename>',
      'Example: read report_001.html'
    ];
  };

  const readReport = async (filename: string) => {
    try {
      const response = await fetch(`/api/reports/${filename}`);
      const text = await response.text();
      return text.split('\n');
    } catch (error: any) {
      return [`Error reading report: ${error?.message || 'Unknown error'}`];
    }
  };

  const handleCommand = async (cmd: string): Promise<string[]> => {
    const command = cmd.trim().toLowerCase();

    if (command === 'help') {
      return [
        'Available commands:',
        '- help: Show this help menu',
        '- clear: Clear the terminal',
        '- info: Show information about this terminal',
        '- mint: Mint a new NFT',
        '- what_the_brick: Show what the brick is',
        '- reports: List available reports',
        '- read <filename>: Read a report file'
      ];
    }

    if (command.startsWith('read ')) {
      const filename = cmd.trim().substring(5);
      return await readReport(filename);
    }

    switch(command) {
      case 'clear':
        setTimeout(() => {
          setOutput(['kek.works research terminal', 'type "help" for available commands']);
        }, 0);
        return [];
      case 'info':
        return [
          'kek.works research terminal v0.1',
          'System Status: ONLINE',
          'Network: SECURE',
          'Uptime: 42:13:37'
        ];
      case 'mint':
        return [
          'MINTING SEQUENCE INITIATED',
          'Preparing quantum encryption...',
          'Generating unique hash...',
          'MINT COMPLETE'
        ];
      case 'what_the_brick':
        return [
          '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛',
          'BRICK PROTOCOL ACTIVATED',
          'CLASSIFIED INFORMATION DETECTED',
          '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛'
        ];
      case 'reports':
        return await listReports();
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
