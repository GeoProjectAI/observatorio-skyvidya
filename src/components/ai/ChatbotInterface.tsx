import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  MessageSquare,
  Send,
  Mic,
  Image,
  Map,
  FileText,
  Settings,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  Share2,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: Array<{
    type: "image" | "map" | "document";
    url: string;
    name?: string;
  }>;
}

interface ChatbotInterfaceProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => Promise<void>;
  onAttachFile?: (file: File) => Promise<void>;
  onClearConversation?: () => void;
  isLoading?: boolean;
  availableModels?: Array<{ id: string; name: string }>;
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
  onExportConversation?: () => void;
  onShareConversation?: () => void;
  floatingMode?: boolean;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({
  initialMessages = [
    {
      id: "welcome-1",
      content:
        "Welcome to the SKYVIDYA GeoIntelligence Platform AI Assistant. How can I help you with geospatial analysis today?",
      sender: "ai",
      timestamp: new Date(),
    },
    {
      id: "welcome-2",
      content:
        "I can help you analyze environmental data, interpret risk patterns on the map, or explain the SKYVIDYA framework dimensions. What would you like to explore?",
      sender: "ai",
      timestamp: new Date(Date.now() + 1000),
    },
  ],
  onSendMessage = async (message) => console.log("Message sent:", message),
  onAttachFile = async (file) => console.log("File attached:", file),
  onClearConversation = () => console.log("Conversation cleared"),
  isLoading = false,
  availableModels = [
    { id: "gpt-4", name: "GPT-4 (Advanced)" },
    { id: "gpt-3.5", name: "GPT-3.5 (Fast)" },
    { id: "geo-llm", name: "GeoLLM (Specialized)" },
  ],
  selectedModel = "geo-llm",
  onModelChange = (modelId) => console.log("Model changed to:", modelId),
  onExportConversation = () => console.log("Exporting conversation"),
  onShareConversation = () => console.log("Sharing conversation"),
  floatingMode = false,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        content: isLoading
          ? "..."
          : "I'm analyzing your geospatial query about " +
            inputValue.substring(0, 20) +
            "... Let me provide some insights based on our environmental data.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);

    try {
      await onSendMessage(inputValue);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const renderMessageContent = (message: Message) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.attachments.map((attachment, index) => (
              <div
                key={index}
                className="border rounded-md overflow-hidden bg-background/50 p-2"
              >
                {attachment.type === "image" && (
                  <img
                    src={attachment.url}
                    alt={attachment.name || "Attachment"}
                    className="max-w-[200px] max-h-[150px] object-cover rounded"
                  />
                )}
                {attachment.type === "map" && (
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-blue-500" />
                    <span>{attachment.name || "Map Location"}</span>
                  </div>
                )}
                {attachment.type === "document" && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span>{attachment.name || "Document"}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (floatingMode && minimized) {
    return (
      <Button
        onClick={toggleMinimize}
        className="flex items-center gap-2 bg-skyvidya-deepBlue hover:bg-skyvidya-deepBlue/90 text-white rounded-full px-4 py-2 shadow-lg"
      >
        <Sparkles className="h-5 w-5" />
        <span>AI Assistant</span>
        <Maximize2 className="h-4 w-4 ml-1" />
      </Button>
    );
  }

  return (
    <Card
      className={`bg-background border-border shadow-md transition-all duration-300 ${isExpanded ? "fixed inset-0 z-50 m-4 rounded-xl" : "w-[400px] h-[500px]"}`}
    >
      <CardHeader className="border-b p-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-base font-medium">
              AI Assistant
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              SKYVIDYA GeoIntelligence
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {floatingMode && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleMinimize}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Minimize</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleExpand}
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isExpanded ? "Minimize" : "Maximize"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 h-full"
      >
        <div className="px-2 border-b">
          <TabsList className="w-full justify-start h-10 bg-transparent p-0">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 h-10"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="chat"
          className="flex-1 flex flex-col overflow-hidden p-0 m-0"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar
                    className={`h-8 w-8 ${message.sender === "user" ? "bg-blue-100" : "bg-green-100"}`}
                  >
                    <AvatarFallback
                      className={
                        message.sender === "user"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }
                    >
                      {message.sender === "user" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 text-sm ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {renderMessageContent(message)}
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Textarea
                placeholder="Ask about geospatial data, environmental patterns, or request analysis..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[60px] resize-none"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Mic className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voice Input</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Image className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach Image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Map className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share Map Location</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || isLoading}
                className="h-8"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <span className="animate-pulse">Processing</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Send
                    <Send className="h-4 w-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Assistant Settings</DialogTitle>
            <DialogDescription>
              Configure your AI assistant preferences and model settings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">AI Model</h3>
              <div className="grid gap-2">
                {availableModels.map((model) => (
                  <div
                    key={model.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${selectedModel === model.id ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => onModelChange(model.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className={`h-4 w-4 ${selectedModel === model.id ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span>{model.name}</span>
                    </div>
                    <div
                      className={`h-4 w-4 rounded-full ${selectedModel === model.id ? "bg-primary" : "border border-muted-foreground"}`}
                    >
                      {selectedModel === model.id && (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Conversation</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={onClearConversation}
                  className="justify-start"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Conversation
                </Button>
                <Button
                  variant="outline"
                  onClick={onExportConversation}
                  className="justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Conversation
                </Button>
                <Button
                  variant="outline"
                  onClick={onShareConversation}
                  className="justify-start"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Conversation
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChatbotInterface;
