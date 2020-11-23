import React, { useEffect, useState } from "react";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "./DraggableUploadInput.scss";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
const DraggableUploadInput = React.forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);

  const handleUpdate = (cards) => {
    setFiles(cards);
    if (cards.length > 0) {
      props.updateFiles(true, cards);
    } else {
      props.updateFiles(false, cards);
    }
  };

  return (
    <div className="DraggableUploadInput">
      <FilePond
        ref={ref}
        files={files}
        onupdatefiles={(e) => handleUpdate(e)}
        allowMultiple={true}
        maxFiles={10}
        allowProcess={false}
        name="images"
        labelIdle='Déposez vos images ici ou <span class="filepond--label-action">recherchez-les</span>'
        labelInvalidField="Certains fichiers ne sont pas valides"
        labelFileWaitingForSize="En attente de la taille du fichier..."
        labelFileSizeNotAvailable="Taille non disponible"
        labelFileLoading="Chargement..."
        labelFileLoadError="Erreur durant le chargement"
        labelFileProcessing="Envoi"
        labelFileProcessingComplete="Envoi terminé"
        labelFileProcessingAborted="Envoi annulé"
        labelFileProcessingError="Erreur durant l'envoi"
        labelFileProcessingRevertError="Erreur durant l'action"
        labelFileRemoveError="Erreur durant la suppression"
        labelTapToCancel="Cliquez pour supprimer"
        labelTapToRetry="Cliquez pour réessayer"
        labelTapToUndo="Cliquez pour annuler"
        labelButtonRemoveItem="Supprimer"
        labelButtonAbortItemLoad="Abandonner"
        labelButtonRetryItemLoad="Réessayer"
        labelButtonAbortItemProcessing="Annuler"
        labelButtonUndoItemProcessing="Stopper"
        labelButtonRetryItemProcessing="Réessayer"
        labelButtonProcessItem="Envoi"
        required={true}
        credits={null}
        allowDrop={true}
        allowReorder={true}
        itemInsertLocation="after"
        dropOnPage={true}
        dropValidation={true}
        instantUpload={false}
        server="/api"
        stylePanelLayout="compact"
      />
    </div>
  );
});

export default DraggableUploadInput;
