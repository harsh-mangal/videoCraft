import { Component } from "react";

// Keep navigation available if a route chunk fails during a deployment or lost connection.
export default class RouteErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <section className="mx-auto max-w-2xl px-5 py-20 text-center">
      <h1 className="font-serif text-4xl">This page could not load</h1>
      <p className="mt-4">Check your connection and reload to get the latest version.</p>
      <a href={this.props.path} className="mt-6 inline-flex min-h-11 items-center rounded border border-[#4D504A] px-6 py-3">Reload page</a>
    </section>;
  }
}
