import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block pl-1 mb-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
                "table emoticons template paste help code",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline strikethrough | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image media | " +
                "forecolor backcolor emoticons | preview code fullscreen",
              content_style:
                "body { font-family:Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
