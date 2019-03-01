let defaultToolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [
    { align: "" },
    { align: "center" },
    { align: "right" },
    { align: "justify" }
  ],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ["link"],
  ["clean"] // remove formatting button
];
export default defaultToolbar
