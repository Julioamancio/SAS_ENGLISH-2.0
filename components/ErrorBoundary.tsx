import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    // Limpeza de emergência completa
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Algo deu errado</h1>
            <p className="text-gray-500 mb-6 text-sm">
              O sistema encontrou um erro crítico (provavelmente armazenamento cheio ou dados corrompidos).
            </p>
            
            <div className="bg-gray-100 p-3 rounded-lg text-left mb-6 overflow-hidden">
                <p className="text-xs font-mono text-red-600 truncate">
                    {this.state.error?.toString()}
                </p>
            </div>

            <button 
              onClick={this.handleReset}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center"
            >
              <RefreshCcw size={18} className="mr-2" /> Restaurar Configurações de Fábrica
            </button>
            <p className="text-xs text-gray-400 mt-4">Isso limpará os dados locais e corrigirá o travamento.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;