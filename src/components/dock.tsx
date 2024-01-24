import { useState } from "react";
import PropTypes from "prop-types";
import { confirm } from "siyuan";
import { deleteDraw, loadAllFiles } from "../services/data";
import { addWhiteboard, renameWhiteboard } from "../utils/dialog";

export const Dock = (props) => {
  const plugin = props.plugin;
  const [files, setFiles] = useState(props.files);

  const copyDraw = (filename) => {
    const pluginName = "siyuan-plugin-whiteboard";
    const tabType = "whiteboard";
    const link = `siyuan://plugins/${pluginName}${tabType}?icon=iconWhiteboard&title=${filename}&data=${JSON.stringify(
      { name: filename }
    )}`;
    navigator.clipboard.writeText(`[${filename}](${encodeURI(link)})`);
  };

  const add = () => addWhiteboard((name) => {
    setFiles([...files, name]);
  });

  const rename = (fileName) => {
    renameWhiteboard(fileName, (name) => {
      files.splice(files.findIndex((v) => v===fileName), 1, name);
      setFiles([...files]);
    });
  };

  const handleOpen = (file) => {
    plugin.open(file, { load: true });
  };

  const handleCopy = (file, event) => {
    event.stopPropagation();
    copyDraw(file);
  };

  const handleDelete = (file, event) => {
    event.stopPropagation();
    confirm(plugin.i18n.deleteWarn + ":" + plugin.i18n.title, plugin.i18n.deleteConfirm.replace("${file}", file), () => {
      deleteDraw(file);
      files.splice(
        files.findIndex((i) => i === file),
        1
      );
      setFiles([...files]);
    });
  };

  const handleEdit = (file, event) => {
    event.stopPropagation();
    rename(file);
  };
  const handleRefresh = async () => {
    const files = await loadAllFiles();
    setFiles(files);
  };

  return (
    <div className="fn__flex-1 fn__flex-column">
      <div className="block__icons">
        <div className="block__logo">
          <svg className="block__logoicon">
            <use xlinkHref="#iconWhiteboard"></use>
          </svg>
          {plugin.i18n.title}
        </div>
        <span className="fn__flex-1 fn__space"></span>
        <span
          data-type="min"
          className="block__icon b3-tooltips b3-tooltips__sw"
          aria-label={plugin.i18n.min}
        >
          <svg>
            <use xlinkHref="#iconMin"></use>
          </svg>
        </span>
        <span
          id="add-draw"
          className="block__icon b3-tooltips b3-tooltips__sw"
          aria-label={plugin.i18n.create}
          onClick={() => add()}
        >
          <svg>
            <use xlinkHref="#iconAdd"></use>
          </svg>
        </span>
        <span
          id="refresh"
          className="block__icon b3-tooltips b3-tooltips__sw"
          aria-label={plugin.i18n.refresh}
          onClick={() => handleRefresh()}
        >
          <svg>
            <use xlinkHref="#iconRefresh"></use>
          </svg>
        </span>
      </div>
      <div className="fn__flex-1 plugin-whiteboard-dock">
        {files?.map((file) => {
          return (
            <div key={file} className="whiteboard-draw" data-name={file}>
              <span onClick={() => handleOpen(file)}>{file}</span>
              <span
                className="fileicon editfile b3-tooltips b3-tooltips__s"
                aria-label={plugin.i18n.edit}
                data-name={file}
                onClick={(e) => handleEdit(file, e)}
              >
                <svg>
                  <use xlinkHref="#iconEdit"></use>
                </svg>
              </span>
              <span
                className="fileicon copyfile b3-tooltips b3-tooltips__s"
                aria-label={plugin.i18n.copyLink}
                data-name={file}
                onClick={(e) => handleCopy(file, e)}
              >
                <svg>
                  <use xlinkHref="#iconCopy"></use>
                </svg>
              </span>
              <span
                className="fileicon deletefile b3-tooltips b3-tooltips__s"
                aria-label={plugin.i18n.delete}
                data-name={file}
                onClick={(e) => handleDelete(file, e)}
              >
                <svg>
                  <use xlinkHref="#iconTrashcan"></use>
                </svg>
              </span>
            </div>
          );
        }) || <div style={{ margin: "0 12px" }}>{plugin.i18n.empty}</div>}
      </div>
    </div>
  );
};

Dock.propTypes = {
  plugin: PropTypes.object.isRequired,
};