/**
 * Simple analytics module for tracking user interactions
 * This is a placeholder implementation that can be replaced with a real analytics service
 */

type EventType = "page_view" | "button_click" | "feature_use" | "error";

interface AnalyticsEvent {
  type: EventType;
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private enabled: boolean = false;
  private userId: string | null = null;
  private sessionId: string = this.generateId();
  private events: AnalyticsEvent[] = [];

  constructor() {
    // Only enable in production or if explicitly enabled
    this.enabled =
      import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === "true";

    // Initialize session
    if (this.enabled) {
      this.initSession();
    }
  }

  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private initSession(): void {
    // Try to get existing user ID from localStorage
    this.userId = localStorage.getItem("skyvidya_user_id");

    if (!this.userId) {
      this.userId = this.generateId();
      localStorage.setItem("skyvidya_user_id", this.userId);
    }

    // Track session start
    this.trackEvent("page_view", "session_start", {
      referrer: document.referrer,
      url: window.location.href,
    });

    // Set up page visibility change tracking
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.trackEvent("page_view", "page_hide");
      } else if (document.visibilityState === "visible") {
        this.trackEvent("page_view", "page_show");
      }
    });
  }

  public trackEvent(
    type: EventType,
    name: string,
    properties: Record<string, any> = {},
  ): void {
    if (!this.enabled) return;

    const event: AnalyticsEvent = {
      type,
      name,
      properties: {
        ...properties,
        url: window.location.href,
        path: window.location.pathname,
        userId: this.userId,
        sessionId: this.sessionId,
      },
      timestamp: Date.now(),
    };

    this.events.push(event);
    this.sendEvents();

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log("[Analytics]", event);
    }
  }

  public trackPageView(
    pageName: string,
    properties: Record<string, any> = {},
  ): void {
    this.trackEvent("page_view", pageName, properties);
  }

  public trackButtonClick(
    buttonName: string,
    properties: Record<string, any> = {},
  ): void {
    this.trackEvent("button_click", buttonName, properties);
  }

  public trackFeatureUse(
    featureName: string,
    properties: Record<string, any> = {},
  ): void {
    this.trackEvent("feature_use", featureName, properties);
  }

  public trackError(
    errorName: string,
    properties: Record<string, any> = {},
  ): void {
    this.trackEvent("error", errorName, properties);
  }

  private sendEvents(): void {
    // In a real implementation, this would batch send events to a server
    // For now, we'll just keep them in memory
    // If we had a real endpoint:
    /*
    if (this.events.length >= 10) {
      const eventsToSend = [...this.events];
      this.events = [];
      
      fetch('https://analytics.skyvidya.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events: eventsToSend
        }),
        keepalive: true
      }).catch(err => {
        console.error('Failed to send analytics events', err);
        // Put events back in queue
        this.events = [...eventsToSend, ...this.events];
      });
    }
    */
  }
}

// Create a singleton instance
export const analytics = new Analytics();

// Export a hook for React components
export function useAnalytics() {
  return analytics;
}
