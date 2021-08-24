export function Map() {

    this._keys = [];
    this._values = [];

    this.set = function (key, value) {
        let index = this._keyIndex(key);
        if (index >= 0) {
            // found
            this._values[index] = value;
        } else {
            // not found
            this._keys.push(key);
            this._values.push(value);
        }
    }

    this.get = function (key) {
        let index = this._keyIndex(key);
        if (index >= 0) {
            // found
            return this._values[index];
        } else {
            // not found
            return null;
        }
    }

    this.getValues = function () {
        // return a copy of the values array
        return this._values.slice();
    }

    this._keyIndex = function (key) {
        for (let i = 0; i < this._keys.length; i++) {
            if (this._keys[i] == key) {
                return i;
            }
        }
        return -1;
    }

}