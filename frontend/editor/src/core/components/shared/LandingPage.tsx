import React, { useState } from "react";
import { Container, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useTranslation } from "react-i18next";
import { useFileHandler } from "@app/hooks/useFileHandler";
import { useFileActionTerminology } from "@app/hooks/useFileActionTerminology";
import { useToolWorkflow } from "@app/contexts/ToolWorkflowContext";
import MobileUploadModal from "@app/components/shared/MobileUploadModal";
import { openFilesFromDisk } from "@app/services/openFilesFromDisk";
import { Logo } from "@app/ui/Logo";
import { LandingActions } from "@app/components/shared/LandingActions";
import LocalIcon from "@app/components/shared/LocalIcon";
import { ToolId } from "@app/types/toolId";
import "@app/components/shared/LandingPage.css";

interface QuickActionCard {
  id: ToolId;
  icon: string;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
  tag?: string;
}

const QUICK_WORKFLOWS: QuickActionCard[] = [
  {
    id: "merge",
    icon: "call-merge-rounded",
    titleKey: "quickWorkflow.merge.title",
    defaultTitle: "Merge & Combine",
    descKey: "quickWorkflow.merge.desc",
    defaultDesc: "Combine multiple PDFs into a single file",
  },
  {
    id: "compress",
    icon: "compress-rounded",
    titleKey: "quickWorkflow.compress.title",
    defaultTitle: "Compress PDF",
    descKey: "quickWorkflow.compress.desc",
    defaultDesc: "Reduce file size while preserving quality",
  },
  {
    id: "convert",
    icon: "swap-horiz-rounded",
    titleKey: "quickWorkflow.convert.title",
    defaultTitle: "Convert Format",
    descKey: "quickWorkflow.convert.desc",
    defaultDesc: "Convert PDF to/from Word, Images & more",
  },
  {
    id: "ocr",
    icon: "document-scanner-outline-rounded",
    titleKey: "quickWorkflow.ocr.title",
    defaultTitle: "OCR & Searchable",
    descKey: "quickWorkflow.ocr.desc",
    defaultDesc: "Extract text from scanned documents",
  },
  {
    id: "sign",
    icon: "draw-rounded",
    titleKey: "quickWorkflow.sign.title",
    defaultTitle: "Sign & Fill",
    descKey: "quickWorkflow.sign.desc",
    defaultDesc: "Add electronic signatures & fill forms",
  },
  {
    id: "addPassword",
    icon: "lock-outline-rounded",
    titleKey: "quickWorkflow.protect.title",
    defaultTitle: "Protect & Encrypt",
    descKey: "quickWorkflow.protect.desc",
    defaultDesc: "Encrypt with passwords & permissions",
  },
];

const LandingPage = () => {
  const { t } = useTranslation();
  const { addFiles } = useFileHandler();
  const { handleToolSelect } = useToolWorkflow();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const terminology = useFileActionTerminology();
  const [mobileUploadModalOpen, setMobileUploadModalOpen] = useState(false);

  const handleFileDrop = async (files: File[]) => {
    await addFiles(files);
  };

  const handleNativeUploadClick = async () => {
    const files = await openFilesFromDisk({
      multiple: true,
      onFallbackOpen: () => fileInputRef.current?.click(),
    });
    if (files.length > 0) {
      await addFiles(files);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      await addFiles(files);
    }
    event.target.value = "";
  };

  const handleFilesReceivedFromMobile = async (files: File[]) => {
    if (files.length > 0) {
      await addFiles(files);
    }
  };

  const handleQuickWorkflowClick = (e: React.MouseEvent, toolId: ToolId) => {
    e.stopPropagation();
    handleToolSelect(toolId);
  };

  return (
    <Container
      size="72rem"
      p="md"
      h="100%"
      className="landing-container flex min-h-0 flex-col overflow-y-auto"
      style={{ position: "relative" }}
    >
      <Dropzone
        onDrop={handleFileDrop}
        multiple
        activateOnClick={false}
        enablePointerEvents
        aria-label={terminology.dropFilesHere}
        className="landing-dropzone flex min-h-0 flex-1 cursor-default flex-col items-center justify-center border-none bg-transparent px-4 py-6 shadow-none outline-none"
        styles={{
          root: {
            border: "none !important",
            backgroundColor: "transparent",
            overflow: "visible",
          },
          inner: {
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          },
        }}
      >
        <div className="landing-hero-card">
          <div className="landing-hero-glow" aria-hidden="true" />
          <Logo
            variant="iconAndText"
            orientation="vertical"
            iconHeight="4.5rem"
            textHeight="2.25rem"
            gap="0.75rem"
            className="landing-logo-enter"
            style={{ marginBottom: "1.25rem" }}
          />

          <p className="landing-hero-tagline">
            {t(
              "landing.tagline",
              "Next-generation workspace for all your document workflows",
            )}
          </p>

          <div className="landing-actions-enter">
            <LandingActions
              fileInputRef={fileInputRef}
              onUploadClick={() => void handleNativeUploadClick()}
              onMobileUploadClick={() => setMobileUploadModalOpen(true)}
              onFileSelect={handleFileSelect}
            />
          </div>

          <p className="landing-drop-hint">
            <LocalIcon icon="upload-rounded" width="1.1rem" height="1.1rem" />
            <span>
              {t(
                "landing.dropHint",
                "or drop PDF files anywhere on this canvas",
              )}
            </span>
          </p>
        </div>

        {/* Quick Workflow Bento */}
        <div className="landing-bento-section">
          <div className="landing-bento-header">
            <span className="landing-bento-title">
              {t("landing.popularWorkflows", "Popular Workflows")}
            </span>
          </div>

          <div className="landing-bento-grid">
            {QUICK_WORKFLOWS.map((wf) => (
              <button
                key={wf.id}
                type="button"
                className="landing-bento-card"
                onClick={(e) => handleQuickWorkflowClick(e, wf.id)}
              >
                <div className="landing-bento-card-icon-wrap">
                  <LocalIcon icon={wf.icon} width="1.35rem" height="1.35rem" />
                </div>
                <div className="landing-bento-card-content">
                  <div className="landing-bento-card-title">
                    {t(wf.titleKey, wf.defaultTitle)}
                  </div>
                  <div className="landing-bento-card-desc">
                    {t(wf.descKey, wf.defaultDesc)}
                  </div>
                </div>
                <div
                  className="landing-bento-card-arrow"
                  aria-hidden="true"
                >
                  <LocalIcon
                    icon="arrow-forward-rounded"
                    width="1rem"
                    height="1rem"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trust & Capabilities Badges */}
        <div className="landing-badges-row">
          <div className="landing-badge-item">
            <LocalIcon
              icon="verified-user-rounded"
              width="1rem"
              height="1rem"
            />
            <Text size="xs" c="dimmed">
              {t(
                "landing.badge.privacy",
                "100% Client-Side Privacy Available",
              )}
            </Text>
          </div>
          <div className="landing-badge-divider" aria-hidden="true" />
          <div className="landing-badge-item">
            <LocalIcon icon="bolt-rounded" width="1rem" height="1rem" />
            <Text size="xs" c="dimmed">
              {t("landing.badge.unlimited", "High Capacity & No File Limits")}
            </Text>
          </div>
          <div className="landing-badge-divider" aria-hidden="true" />
          <div className="landing-badge-item">
            <LocalIcon
              icon="dashboard-customize-outline-rounded"
              width="1rem"
              height="1rem"
            />
            <Text size="xs" c="dimmed">
              {t("landing.badge.tools", "50+ Professional PDF Operations")}
            </Text>
          </div>
        </div>
      </Dropzone>

      <MobileUploadModal
        opened={mobileUploadModalOpen}
        onClose={() => setMobileUploadModalOpen(false)}
        onFilesReceived={handleFilesReceivedFromMobile}
      />
    </Container>
  );
};

export default LandingPage;
