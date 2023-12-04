import "./Popper.scss";

function Item({ data, onClick }) {
  return (
    <div className="item-popper" onClick={onClick}>
      <span>{data.icon}</span>
      <span className="title">{data.title}</span>
    </div>
  );
}

export default Item;
