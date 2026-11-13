import { useEffect, useState } from "react";
import { Briefing } from "./components/Briefing";
import { ConsequenceReport } from "./components/ConsequenceReport";
import { Debrief } from "./components/Debrief";
import { MissionDashboard } from "./components/MissionDashboard";
import { SourcesScreen } from "./components/SourcesScreen";
import { TitleScreen } from "./components/TitleScreen";
import { TopBar } from "./components/TopBar";
import { createInitialState, resolveCycle } from "./game/engine";
import type { ActionId, CycleReport, GameState } from "./game/types";
import { clearSavedMission, loadMission, saveMission } from "./storage/persist";

type Screen = "title" | "briefing" | "mission" | "report" | "debrief" | "sources";

export default function App() {
  const [restored] = useState<GameState | null>(() => loadMission());
  const [state, setState] = useState<GameState>(() => restored ?? createInitialState());
  const [screen, setScreen] = useState<Screen>(() => (restored ? "mission" : "title"));
  const [report, setReport] = useState<CycleReport | null>(null);
  const [sourcesReturn, setSourcesReturn] = useState<Screen>("title");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (state.status === "active" && (screen === "mission" || screen === "report")) {
      saveMission(state);
    } else if (state.status !== "active" || screen === "title") {
      clearSavedMission();
    }
  }, [screen, state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  function startMission() {
    setState(createInitialState());
    setReport(null);
    setScreen("briefing");
    setAnnouncement("Mission briefing open. Five cycles, four crew, one decision per cycle.");
  }

  function enterOutpost() {
    setScreen("mission");
    setAnnouncement("Outpost dashboard open. Choose one action for cycle one.");
  }

  function openSources(from: Screen) {
    setSourcesReturn(from);
    setScreen("sources");
  }

  function closeSources() {
    if (sourcesReturn === "report" && !report) {
      setScreen(state.status === "active" ? "mission" : "debrief");
      return;
    }
    setScreen(sourcesReturn);
  }

  function chooseAction(actionId: ActionId) {
    const result = resolveCycle(state, actionId);

    if (!result.ok) {
      setAnnouncement(`Action not available. ${result.reason}`);
      return;
    }

    setState(result.state);
    setReport(result.report);
    setScreen("report");

    const outcome =
      result.report.status === "failed"
        ? "The mission has ended."
        : result.report.status === "active"
          ? `Cycle ${result.report.cycle + 1} is ready.`
          : "The mission is complete.";

    setAnnouncement(`Cycle ${result.report.cycle} resolved with ${result.report.action.label}. ${outcome}`);
  }

  function continueFromReport() {
    if (state.status === "active") {
      setReport(null);
      setScreen("mission");
      return;
    }
    setScreen("debrief");
  }

  function playAgain() {
    setState(createInitialState());
    setReport(null);
    setScreen("briefing");
    setAnnouncement("New mission ready. The outpost is back to its starting condition.");
  }

  function backToTitle() {
    setState(createInitialState());
    setReport(null);
    setScreen("title");
    clearSavedMission();
    setAnnouncement("Returned to the title screen.");
  }

  function renderScreen() {
    switch (screen) {
      case "title":
        return <TitleScreen onStart={startMission} />;
      case "briefing":
        return <Briefing onEnter={enterOutpost} onOpenSources={() => openSources("briefing")} />;
      case "mission":
        return (
          <MissionDashboard
            state={state}
            onChoose={chooseAction}
            onRestart={backToTitle}
            onOpenSources={() => openSources("mission")}
          />
        );
      case "report":
        return report ? (
          <ConsequenceReport
            report={report}
            status={state.status}
            maxCycles={state.maxCycles}
            onContinue={continueFromReport}
          />
        ) : (
          <MissionDashboard
            state={state}
            onChoose={chooseAction}
            onRestart={backToTitle}
            onOpenSources={() => openSources("mission")}
          />
        );
      case "debrief":
        return (
          <Debrief
            state={state}
            onPlayAgain={playAgain}
            onOpenSources={() => openSources("debrief")}
            onBackToTitle={backToTitle}
          />
        );
      case "sources":
        return <SourcesScreen onBack={closeSources} backLabel="Back to the mission" />;
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to mission content
      </a>
      <TopBar />
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      {renderScreen()}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            Outpost Zero is an educational simulation built by team APOAPSIS for the NASA Space Apps
            Challenge 2026. It is not affiliated with or endorsed by NASA. All resource values,
            thresholds, and events are simplified game design.
          </p>
          <p>
            No accounts and no tracking. Mission progress is stored in this browser only.
          </p>
        </div>
      </footer>
    </div>
  );
}
