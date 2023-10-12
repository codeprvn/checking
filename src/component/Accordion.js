
const Accordion = ({ items, isActive, setAct }) => {
  return (
    <div className="accordion-item">
      <div
        className="accordion-title d-flex justify-content-between p-2"
        onClick={setAct}
      >
        <div>{items?.name}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && (
        <div className="accordion-content">
          <ul>
            {items?.subModule.map((link, index) => (
              <li key={index}>
                <a href={link.route}>{link?.subname}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
