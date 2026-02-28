import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AcademicCapIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { certificates } from '../../data/certificates';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';

export const CertificatesApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('certificates');
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null);

  if (!windowState) return null;

  return (
    <>
      <Window
        window={windowState}
        title="Certificates"
        icon={AcademicCapIcon}
        onClose={() => closeWindow(windowState.id)}
        onMinimize={() => minimizeWindow(windowState.id)}
        onMaximize={() => maximizeWindow(windowState.id)}
        minWidth={700}
        minHeight={500}
      >
        <div className="h-full overflow-auto bg-white dark:bg-gray-900 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {certificates.length} professional certifications from leading institutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCertificate(cert)}
                className="certificate-card cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-macos-blue transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-macos-yellow to-macos-orange flex items-center justify-center flex-shrink-0">
                    <AcademicCapIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                  </div>
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Window>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
            >
              {/* Certificate Image Preview */}
              <div className="aspect-video bg-gradient-to-br from-macos-yellow/20 to-macos-orange/20 relative overflow-hidden">
                <img
                  src={selectedCertificate.imageUrl}
                  alt={selectedCertificate.name}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Certificate';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AcademicCapIcon className="w-24 h-24 text-white/50" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedCertificate.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedCertificate.issuer}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Issued: {selectedCertificate.date}</span>
                  {selectedCertificate.credentialId && (
                    <span>• ID: {selectedCertificate.credentialId}</span>
                  )}
                </div>

                {selectedCertificate.credentialUrl && (
                  <a
                    href={selectedCertificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-macos-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    Verify Certificate
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesApp;
