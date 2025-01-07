import styles from "./DropDown.module.css";
export default function NormalDropDown({ onChange, value, title, items }) {
  return (
    <>
      <div className={styles.wrap_normal_drop}>
        <select
          className={styles.select_drop}
          onChange={onChange}
          value={value}
        >
          <option value="-1" disabled>
            {title}
          </option>
          {items.map((item) => (
            <option className={styles.select_item} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
