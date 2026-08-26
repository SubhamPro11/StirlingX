import { DOWNLOAD_BASE_URL } from "@app/constants/downloads";

export interface UpdateSummary {
  latest_version: string | null;
  latest_stable_version?: string | null;
  max_priority: "urgent" | "normal" | "minor" | "low";
  recommended_action?: string;
  any_breaking: boolean;
  migration_guides?: Array<{
    version: string;
    notes: string;
    url: string;
  }>;
}

export interface VersionUpdate {
  version: string;
  priority: "urgent" | "normal" | "minor" | "low";
  announcement: {
    title: string;
    message: string;
  };
  compatibility: {
    breaking_changes: boolean;
    breaking_description?: string;
    migration_guide_url?: string;
  };
}

export interface FullUpdateInfo {
  latest_version: string;
  latest_stable_version?: string;
  new_versions: VersionUpdate[];
}

export interface MachineInfo {
  machineType: string;
  activeSecurity: boolean;
  licenseType: string;
}

export class UpdateService {
  /**
   * Compare two version strings
   * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal
   */
  compareVersions(version1: string, version2: string): number {
    const v1 = version1.replace(/^v/, "").split(".");
    const v2 = version2.replace(/^v/, "").split(".");

    for (let i = 0; i < v1.length || i < v2.length; i++) {
      const n1 = parseInt(v1[i]) || 0;
      const n2 = parseInt(v2[i]) || 0;

      if (n1 > n2) {
        return 1;
      } else if (n1 < n2) {
        return -1;
      }
    }

    return 0;
  }

  /**
   * Get download URL based on machine type and security settings
   */
  getDownloadUrl(machineInfo: MachineInfo): string | null {
    if (
      machineInfo.machineType === "Docker" ||
      machineInfo.machineType === "Kubernetes"
    ) {
      return null;
    }

    if (machineInfo.machineType === "Server-jar") {
      return (
        DOWNLOAD_BASE_URL +
        (machineInfo.activeSecurity
          ? "Stirling-PDF-with-login.jar"
          : "Stirling-PDF.jar")
      );
    }

    if (machineInfo.machineType.startsWith("Client-")) {
      const os = machineInfo.machineType.replace("Client-", "");
      const type = machineInfo.activeSecurity ? "-server-security" : "-server";

      if (os === "unix") {
        return DOWNLOAD_BASE_URL + os + type + ".jar";
      } else if (os === "win") {
        return DOWNLOAD_BASE_URL + os + "-installer.exe";
      } else if (os === "mac") {
        return DOWNLOAD_BASE_URL + os + "-installer.dmg";
      }
    }

    return null;
  }

  /**
   * Fetch update summary from GitHub Releases directly (no Supabase dependency)
   */
  async getUpdateSummary(
    currentVersion: string,
    _machineInfo?: MachineInfo,
  ): Promise<UpdateSummary | null> {
    try {
      const latestTag = await this.fetchLatestVersionFromGitHub();
      if (!latestTag) {
        return null;
      }

      const isNewer = this.compareVersions(latestTag, currentVersion) > 0;
      return {
        latest_version: latestTag,
        latest_stable_version: latestTag,
        max_priority: "normal",
        any_breaking: false,
        recommended_action: isNewer
          ? "A new version of StirlingX is available."
          : undefined,
      };
    } catch {
      return null;
    }
  }

  /**
   * Fetch full update information
   */
  async getFullUpdateInfo(
    currentVersion: string,
    machineInfo: MachineInfo,
  ): Promise<FullUpdateInfo | null> {
    try {
      const summary = await this.getUpdateSummary(currentVersion, machineInfo);
      if (!summary || !summary.latest_version) return null;

      return {
        latest_version: summary.latest_version,
        latest_stable_version:
          summary.latest_stable_version ?? summary.latest_version,
        new_versions: [
          {
            version: summary.latest_version,
            priority: summary.max_priority,
            announcement: {
              title: `StirlingX v${summary.latest_version}`,
              message:
                "Latest release with updated UI and performance improvements.",
            },
            compatibility: {
              breaking_changes: false,
            },
          },
        ],
      };
    } catch {
      return null;
    }
  }

  /**
   * Query GitHub API for the latest release tag
   */
  private async fetchLatestVersionFromGitHub(): Promise<string | null> {
    const urls = [
      "https://api.github.com/repos/SubhamPro11/StirlingX/releases/latest",
      "https://api.github.com/repos/Stirling-Tools/Stirling-PDF/releases/latest",
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (response.ok) {
          const data = (await response.json()) as { tag_name?: string };
          if (data.tag_name) {
            return data.tag_name.replace(/^v/, "");
          }
        }
      } catch {
        // try next endpoint
      }
    }

    return null;
  }
}

export const updateService = new UpdateService();
