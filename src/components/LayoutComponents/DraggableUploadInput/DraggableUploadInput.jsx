import React, { useEffect, useState } from "react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "./DraggableUploadInput.scss";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

// Our app
const DraggableUploadInput = React.forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);

  const localDraftCard = JSON.parse(window.localStorage.getItem("draftNewCard"));

  useEffect(() => {
    if (props.emptyState) {
      setFiles([]);
    }
  }, [props.emptyState]);

  useEffect(() => {
    if (localDraftCard.images) {
      let i = 0;
      const imgObjectArray = localDraftCard.images.map((url) => {
        i++;
        return {
          source: url,
          options: {
            type: "local",
            metadata: {
              poster: url,
            },
          },
        };
      });
      console.log(imgObjectArray);
      setFiles(imgObjectArray);

      // localDraftCard.images.map((url) => {
      //   // console.log(typeof url);
      //   const img = new Image();
      //   img.src = url;
      //   console.log(img);
      //   img.onload = () => {
      //     console.log(img);
      //     ref.current
      //       .addFile(url)
      //       .then((file) => console.log(file))
      //       .catch((err) => console.log(err));
      //   };
      //   return img;
      // });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (cards) => {
    setFiles(cards);
    if (cards.length > 0) {
      props.updateFiles(true, cards);
    } else {
      props.updateFiles(false, cards);
    }
  };

  const serverOptions = {
    server: {
      url: "https://api.cloudinary.com/v1_1/hiimurmrd/image",
      load: "./load/",
    },
  };
  console.log(ref.current);

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
        server={serverOptions}
        stylePanelLayout="compact"
        allowFileSizeValidation={true}
        maxFileSize="2MB"
        labelMaxFileSizeExceeded="Fichier trop lourd!"
        labelMaxFileSize="La taille maximale du fichier est de {filesize}"
        allowFilePoster={true}
        filePosterMaxHeight="200px"
      />
    </div>
  );
});

export default DraggableUploadInput;
