/**
 * @fileOverview  错误处理模块
 * @name error.js
 * @module modules/error
 * @author 张露
 * @see {@link create_error}
 */
/**
 * 将状态信息和提供给用户的错误信息附加进异常中
 * @param {Error} err 要进行附加处理的异常
 * @param {number} status 错误状态(如 404 或者 500)
 * @param {?string} user_message 提供给用户的错误信息，可以省略。
 * 如果省略则不提供用户信息
 */
function attach_message_and_status(err, status, user_message) {
    err.status = status;
    err.user_message = user_message;
}

/**
 * 生成异常并打印异常信息， 参考 {@link log_error}
 * @param {(Error|string)} err_or_str 要进行处理的那个异常，如果是一个字符串的话
 * 会自动生成一个异常
 * @param {number} status错误状态(如 404 或者 505)
 * @param {?string} user_message 提供给用户的错误信息，如果省略则不提供。
 * @returns {Error}
 */
function create_error(err_or_str, status, user_message) {
    if (typeof err_or_str == 'string' || err_or_str instanceof String) {
        var err = new Error(err_or_str);
    } else {
        var err = err_or_str;
    }
    attach_message_and_status(err, status, user_message);
    return err;
}

create_error.attach_message_and_status = attach_message_and_status;
module.exports = create_error;