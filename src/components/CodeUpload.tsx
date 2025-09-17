import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Shield, AlertTriangle, CheckCircle, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vulnerability {
  type: 'critical' | 'high' | 'medium' | 'low';
  line: number;
  description: string;
  code: string;
  fix: string;
  explanation: string;
}

interface AnalysisResult {
  vulnerabilities: Vulnerability[];
  fixedCode: string;
  score: number;
}

const CodeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(selectedFile);
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  }, [toast]);

  const analyzeCode = useCallback(async () => {
    if (!code) return;
    
    setIsAnalyzing(true);
    
    // Simulate vulnerability analysis
    setTimeout(() => {
      const mockVulnerabilities: Vulnerability[] = [
        {
          type: 'critical',
          line: 15,
          description: 'SQL Injection vulnerability',
          code: `query = "SELECT * FROM users WHERE id = " + userId`,
          fix: `query = "SELECT * FROM users WHERE id = ?"
params = [userId]`,
          explanation: 'Direct string concatenation in SQL queries allows attackers to inject malicious SQL code. Use parameterized queries instead.'
        },
        {
          type: 'high',
          description: 'Cross-Site Scripting (XSS)',
          line: 23,
          code: `innerHTML = userInput`,
          fix: `textContent = userInput
// or use proper sanitization library`,
          explanation: 'Setting innerHTML with user input without sanitization can lead to XSS attacks. Use textContent or proper sanitization.'
        },
        {
          type: 'medium',
          line: 8,
          description: 'Weak password validation',
          code: `if (password.length > 6)`,
          fix: `if (password.length >= 12 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/.test(password))`,
          explanation: 'Password should be at least 12 characters long and contain uppercase, lowercase, numbers, and special characters.'
        }
      ];

      const fixedCode = code
        .replace(/query = "SELECT \* FROM users WHERE id = " \+ userId/g, 
          'query = "SELECT * FROM users WHERE id = ?"\nparams = [userId]')
        .replace(/innerHTML = userInput/g, 'textContent = userInput')
        .replace(/if \(password\.length > 6\)/g, 
          'if (password.length >= 12 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/.test(password))');

      setResult({
        vulnerabilities: mockVulnerabilities,
        fixedCode,
        score: 85
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: `Found ${mockVulnerabilities.length} vulnerabilities`,
      });
    }, 3000);
  }, [code, toast]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
  };

  const downloadFixedCode = () => {
    if (!result) return;
    
    const blob = new Blob([result.fixedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file?.name ? `fixed_${file.name}` : 'fixed_code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (type: Vulnerability['type']) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6 pt-0">
      <div className="max-w-6xl mx-auto space-y-6 pt-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SecureCode Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your code files to identify security vulnerabilities and get instant fixes with detailed explanations
          </p>
        </div>

        {/* Upload Section */}
        <Card className="bg-gradient-card border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Code File
            </CardTitle>
            <CardDescription>
              Select a code file (.js, .py, .php, .java, .cpp, .c, .ts, etc.) for security analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Support for most programming languages
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".js,.ts,.py,.php,.java,.cpp,.c,.go,.rb,.rs,.swift,.kt"
                />
              </label>
            </div>
            
            {file && (
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <Badge variant="outline">{(file.size / 1024).toFixed(1)} KB</Badge>
                </div>
                <Button 
                  onClick={analyzeCode} 
                  disabled={isAnalyzing}
                  variant="default"
                  className="bg-gradient-primary"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-scan h-4 w-4 mr-2 border-t-2 border-primary rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {result && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vulnerabilities */}
            <Card className="bg-gradient-card border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Vulnerabilities Found
                  <Badge variant="outline" className="ml-auto">
                    Security Score: {result.score}%
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {result.vulnerabilities.length} security issues detected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.vulnerabilities.map((vuln, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={getSeverityColor(vuln.type)}>
                        {vuln.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Line {vuln.line}</span>
                    </div>
                    
                    <h4 className="font-semibold text-foreground">{vuln.description}</h4>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Vulnerable code:</p>
                      <pre className="bg-destructive/10 p-2 rounded text-xs text-destructive overflow-x-auto">
                        <code>{vuln.code}</code>
                      </pre>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Fixed code:</p>
                      <pre className="bg-secondary/10 p-2 rounded text-xs text-secondary overflow-x-auto">
                        <code>{vuln.fix}</code>
                      </pre>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{vuln.explanation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fixed Code */}
            <Card className="bg-gradient-card border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  Secured Code
                </CardTitle>
                <CardDescription>
                  Your code with all vulnerabilities fixed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted/20 p-4 rounded-lg text-sm text-foreground overflow-x-auto max-h-96 overflow-y-auto">
                    <code>{result.fixedCode}</code>
                  </pre>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => copyToClipboard(result.fixedCode)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  
                  <Button 
                    onClick={downloadFixedCode}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeUpload;