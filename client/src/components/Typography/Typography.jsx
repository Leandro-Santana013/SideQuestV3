import "./TypographyStyle.css";

export const Typography = ({
  children,
  type,
  color = "white",
  bold,
  orientation = "inherit",
}) => {
  let fontSize = {
    48: { style: "48px" },
    40: { style: "40px" },
    32: { style: "32px" },
    28: { style: "28px" },
    24: { style: "24px" },
    20: { style: "20px" },
    16: { style: "16px" },
    12: { style: "12px" },
    8: { style: "8px" },
  }[type];

  let selectColor = {
    blue: { style: "blue " },
    yellow: { style: "yellow" },
    green: { style: "green " },
    red: { style: "red" },
    black: { style: "lack " },
    white: { style: "white" },
  }[color];

  return (
    <p
      className={selectColor.style}
      style={{
        fontSize: `${fontSize.style}`,
        fontWeight: `${bold}`,
        textAlign: `${orientation}`,
      }}
    >
      {children}
    </p>
  );
};
