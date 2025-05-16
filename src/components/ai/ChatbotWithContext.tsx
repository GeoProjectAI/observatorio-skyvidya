import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { SkyvidyaLogo } from "@/components/ui/skyvidya-logo";
import {
  MessageSquare,
  Send,
  Sparkles,
  Map,
  FileText,
  BarChart2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  contextType?: "map" | "data" | "document" | null;
  contextReference?: string;
};

type ContextItem = {
  id: string;
  type: "map" | "data" | "document";
  title: string;
  description: string;
  thumbnail?: string;
  reference: string;
};

export function ChatbotWithContext() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your SKYVIDYA AI assistant. I can help you analyze environmental data, interpret geospatial information, and provide insights about climate patterns. What would you like to know today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample context items
  const contextItems: ContextItem[] = [
    {
      id: "map-1",
      type: "map",
      title: "Amazon Deforestation Map",
      description:
        "Current deforestation patterns in the Amazon rainforest (2023)",
      thumbnail:
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&q=80",
      reference: "maps/amazon-deforestation-2023",
    },
    {
      id: "data-1",
      type: "data",
      title: "Climate Risk Assessment",
      description: "Risk scores for 516 assets across climate dimensions",
      thumbnail:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200&q=80",
      reference: "datasets/climate-risk-2023",
    },
    {
      id: "document-1",
      type: "document",
      title: "ESG Compliance Report",
      description:
        "Q3 2023 Environmental, Social, and Governance compliance report",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
      reference: "documents/esg-q3-2023",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        role: "assistant",
        timestamp: new Date(),
        contextType: Math.random() > 0.5 ? "map" : "data",
        contextReference:
          contextItems[Math.floor(Math.random() * contextItems.length)]
            .reference,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const responses = [
      "Based on our analysis of the satellite imagery, deforestation in this region has increased by 12% compared to last year. The most affected areas are highlighted in red on the map.",
      "The climate risk assessment indicates that 131 assets are in high-risk zones. I've prepared a detailed breakdown by risk category and geographic location.",
      "According to the latest ESG report, your environmental score is 72/100, which is above the industry average of 65/100. There are opportunities to improve in the waste management category.",
      "The H3 hexagon analysis shows clusters of environmental anomalies in the coastal regions. This pattern correlates with the recent temperature increases recorded in the area.",
      "I've analyzed the temporal data from 2018-2023, and there's a clear trend of increasing precipitation variability in this region, which aligns with climate change projections.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addContextToChat = (item: ContextItem) => {
    const contextMessage: Message = {
      id: Date.now().toString(),
      content: `I've added the ${item.title} to our conversation for reference.`,
      role: "assistant",
      timestamp: new Date(),
      contextType: item.type,
      contextReference: item.reference,
    };

    setMessages((prev) => [...prev, contextMessage]);
    setActiveTab("chat");
  };

  return (
    <Card className="flex flex-col h-full border-none shadow-md">
      <CardHeader className="px-4 py-3 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SkyvidyaLogo size="xs" variant="default" />
            <CardTitle className="text-lg font-medium">
              SKYVIDYA Assistant
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            <Sparkles className="h-3 w-3 mr-1" /> AI Powered
          </Badge>
        </div>
      </CardHeader>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Context
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 bg-blue-100">
                        <SkyvidyaLogo size="xs" variant="default" />
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                      <p className="text-sm">{message.content}</p>

                      {message.contextType && (
                        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-2">
                          {message.contextType === "map" && (
                            <Map className="h-4 w-4 text-blue-500" />
                          )}
                          {message.contextType === "data" && (
                            <BarChart2 className="h-4 w-4 text-blue-500" />
                          )}
                          {message.contextType === "document" && (
                            <FileText className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="text-xs text-gray-500">
                            {message.contextType === "map" && "Map reference: "}
                            {message.contextType === "data" &&
                              "Data reference: "}
                            {message.contextType === "document" &&
                              "Document reference: "}
                            {message.contextReference?.split("/").pop()}
                          </span>
                        </div>
                      )}
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 bg-blue-600 text-white">
                        <span className="text-xs font-medium">You</span>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-blue-100">
                      <SkyvidyaLogo size="xs" variant="default" />
                    </Avatar>
                    <div className="rounded-lg p-3 bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <CardFooter className="p-4 pt-2 border-t bg-white">
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Ask about environmental data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="context" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">
                Available Context
              </h3>

              {contextItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => addContextToChat(item)}
                >
                  <div className="flex">
                    {item.thumbnail && (
                      <div className="w-20 h-20 bg-gray-100">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-3 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === "map" && (
                          <Map className="h-4 w-4 text-blue-500" />
                        )}
                        {item.type === "data" && (
                          <BarChart2 className="h-4 w-4 text-green-500" />
                        )}
                        {item.type === "document" && (
                          <FileText className="h-4 w-4 text-amber-500" />
                        )}
                        <h4 className="font-medium text-sm">{item.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
