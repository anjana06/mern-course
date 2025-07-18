export const FormRowSelect = ({name,labeltext,list,defaultValue="",onChange})=>{
    return (
      <>
        <div className="form-row">
          <label htmlFor={name} className="form-label">
            {labeltext}
          </label>
          <select
            name={name}
            id={name}
            className="form-select"
            defaultValue={defaultValue}
            onChange={onChange}
          >
            {list.map((itemValue) => {
              return (
                <option key={itemValue} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
          </select>
        </div>
      </>
    );
}