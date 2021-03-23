import { Component } from "react";
import './modal.css';

interface GenericModalProps {
  msg: string,
  type: string,
  onSubmit?: any,
  onDelete?: any
}

export default class GenericModal extends Component<GenericModalProps> {

  public constructor(props: GenericModalProps) {
    super(props);
  }

  public render() {
    let modal = this.props;

    return (
      <div className={`modal ${modal.type}`}>
        <div className="modal-content">
          <div className="modal-header">

            <h2 id={`${modal.type}-msg`}>
              {modal.msg}
            </h2>

            {/* Deletion */}
            {modal.type === 'danger'
              &&
              <div className="btns">
                <input className="submit-btn" type="submit" value="Oh, no! My bad." onClick={modal.onSubmit} />
                <input className="delete-btn" type="button" value="Yes, please." onClick={modal.onDelete} />
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}
