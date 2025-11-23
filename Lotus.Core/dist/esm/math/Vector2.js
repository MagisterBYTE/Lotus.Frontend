import { XMath } from './Common';
import { Vector3 } from './Vector3';
export class Vector2 {
    // #region Const
    /**
     * Единичный вектор
     */
    static One = new Vector2(1, 1);
    /**
     * Вектор "право"
     */
    static Right = new Vector2(1, 0);
    /**
     * Вектор "влево"
     */
    static Left = new Vector2(-1, 0);
    /**
     * Вектор "вверх"
     */
    static Up = new Vector2(0, 1);
    /**
     * Вектор "вниз"
     */
    static Down = new Vector2(0, -1);
    /**
     * Нулевой вектор
     */
    static Zero = new Vector2(0, 0);
    // #endregion
    // #region Static methods
    static cross(vector, vector2, dest) {
        if (!dest)
            dest = new Vector3();
        const x = vector.x;
        const y = vector.y;
        const x2 = vector2.x;
        const y2 = vector2.y;
        const z = x * y2 - y * x2;
        dest.xyz = [0, 0, z];
        return dest;
    }
    /**
     * Calculates the dot product of two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The dot product of the two vectors
     */
    static dot(vector, vector2) {
        return vector.x * vector2.x + vector.y * vector2.y;
    }
    /**
     * Calculates the distance between two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static distance(vector, vector2) {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    }
    /**
     * Calculates the distance between two vectors squared
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static squaredDistance(vector, vector2) {
        const x = vector2.x - vector.x;
        const y = vector2.y - vector.y;
        return x * x + y * y;
    }
    /**
     * Calculates a normalized vector representing the direction from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static direction(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        const x = vector.x - vector2.x;
        const y = vector.y - vector2.y;
        let length = Math.sqrt(x * x + y * y);
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x = x * length;
        dest.y = y * length;
        return dest;
    }
    /**
     * Performs a linear interpolation over two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} a
     * @param {Vector2} b
     * @param {number} t
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static lerp(a, b, t, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = a.x + t * (b.x - a.x);
        dest.y = a.y + t * (b.y - a.y);
        return dest;
    }
    /**
     * Adds two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static sum(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        return dest;
    }
    /**
     * Subtracts two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static difference(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        return dest;
    }
    /**
     * Multiplies two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static product(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static quotient(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;
        return dest;
    }
    // #endregion
    // #region Fields  
    /**
     * Координата X
     */
    x;
    /**
     * Координата Y
     */
    y;
    // #endregion
    // #region Properties  
    /**
     * @returns {number[]} An array containing the x-component and y-component of the vector
     */
    get xy() {
        return [this.x, this.y];
    }
    /**
     * @param {number[]} values An array containing the new x-component and y-component of the vector
     */
    set xy(values) {
        this.x = values[0];
        this.y = values[1];
    }
    // #endregion
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // #region Main methods
    /**
     * Retrieves the x-component or y-component of the vector.
     * @param {number} index
     * @returns {number}
     */
    at(index) {
        if (index === 0)
            return this.x;
        return this.y;
    }
    /**
     * Sets both the x- and y-components of the vector to 0.
     */
    reset() {
        this.x = 0;
        this.y = 0;
    }
    /**
     * Copies the x- and y-components from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    copy(dest) {
        if (!dest)
            dest = new Vector2(0, 0);
        dest.xy = this.xy;
        return dest;
    }
    /**
     * Multiplies both the x- and y-components of a vector by -1.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    negate(dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = -this.x;
        dest.y = -this.y;
        return dest;
    }
    /**
     * Checks if two vectors are equal, using a threshold to avoid floating-point precision errors.
     * @param {Vector2} other
     * @param {number} threshold
     * @returns {boolean}
     */
    equals(other, threshold = XMath.EPSILON) {
        if (Math.abs(this.x - other.x) > threshold) {
            return false;
        }
        if (Math.abs(this.y - other.y) > threshold) {
            return false;
        }
        return true;
    }
    /**
     * Returns the distance from the vector to the origin.
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.squaredLength());
    }
    /**
     * Returns the distance from the vector to the origin, squared.
     * @returns {number}
     */
    squaredLength() {
        const x = this.x;
        const y = this.y;
        return x * x + y * y;
    }
    /**
     * Adds two vectors together.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    add(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x + vector.x;
        dest.y = this.y + vector.y;
        return dest;
    }
    /**
     * Subtracts one vector from another.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    subtract(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x - vector.x;
        dest.y = this.y - vector.y;
        return dest;
    }
    /**
     * Multiplies two vectors together piecewise.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    multiply(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x * vector.x;
        dest.y = this.y * vector.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    divide(vector, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x / vector.x;
        dest.y = this.y / vector.y;
        return dest;
    }
    /**
     * Scales a vector by a scalar parameter.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {number} value
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    scale(value, dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.x = this.x * value;
        dest.y = this.y * value;
        return dest;
    }
    /**
     * Normalizes a vector.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    normalize(dest) {
        if (!dest)
            dest = new Vector2(this.x, this.y);
        dest.xy = this.xy;
        let length = dest.length();
        if (length === 1) {
            return dest;
        }
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x *= length;
        dest.y *= length;
        return dest;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
//# sourceMappingURL=Vector2.js.map